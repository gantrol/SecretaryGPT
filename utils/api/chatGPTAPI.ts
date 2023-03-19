// TODO: handle unauthorized
//  {
//     "detail": {
//         "message": "Unauthorized - Access token is missing"
//     }
// }
import {fetchSSE} from "~utils/sse/sse";
import {getUUID} from "~utils/uuid";
import type {API, AskResult, AskResultCallback} from "~utils/api/api";
import {text2tokenAndSplit} from "~utils/prompt/tokenize";
import {RequestText} from "~utils/constants";

type Model = {
    "slug": string,
    "max_tokens": number,
    "title": string,
    "description": string,
    "tags": any[]
}

type Message = {
    "parent_message_id": string,
    "message_id": string,
    "conversation_id": string,
    "author": string,
    "text": string,
}

type ChatGPTBody =
    {} |
    {
    action: string;
    messages: {
        role: string;
        id: string;
        content: {
            content_type: string;
            parts: string[]
        }
    }[];
    model: string
};

export class ChatGPTAPI implements API {
    host: string = "https://chat.openai.com/";
    max_tokens: number = 4097;
    conversation_id: string;
    parent_message_id: string;
    // TODO: messages manage?
    //  e.g. message queue and chat list
    // queues 应该有个callback...
    queues: Message[] = [];

    request = async <T>(path, method, body: ChatGPTBody = {}, auth_key = "") => {
        const {init, url} = this.requestPrepare(auth_key, method, body, path);
        const response = await fetch(url, init);
        return response.json();
    }

    auth = async (): Promise<string> => {
        // TODO: cache the auth_key
        const data = await this.request<{
            accessToken: string,
        }>("api/auth/session", "GET");

        return data.accessToken;
    }


    model = async (): Promise<string> => {
        const default_model = "text-davinci-002-render"
        try {
            const models = await this.models();
            const result = models[0].slug;
            return result ? result : default_model;
        } catch (e) {
            return default_model;
        }
    }

    /**
     * @description Get models
     *
     * // TODO: select models
     *
     * @returns {Promise<Model[]>}
     * example:
     *  {
     *      "slug": "text-davinci-002-render-sha",
     *      "max_tokens": 4097,
     *      "title": "Default",
     *      "description": "Optimized for speed, currently available to Plus users",
     *      "tags": []
     *  }
     */
    models = async (): Promise<Model[]> => {
        const data = await this.request<{
            models: Model[],
        }>("backend-api/models", "GET", {}, await this.auth());
        return data.models;
    }

    /**
     * TODO: new just new?
     * @description Create a new conversation with prompt
     * @param prompt
     * @param callback
     *
     * example: {
     *     "type": "ans",
     *     "data": {
     *         "text": "Sure, here's a classic one:\n\nWhy don't",
     *         "messageId": "...",
     *         "conversationId": "..."
     *     }
     * }
     */
    newCov = async (prompt: string, callback: AskResultCallback): Promise<any> => {
        this.conversation_id = null;
        this.parent_message_id = getUUID();
        // TODO: cancel current sse
        this.queues = [];
        console.log("newCov", prompt);
        return await this.ask(prompt, callback);
    }

    askAll = async (prompts: string[], chatid: string, callback: AskResultCallback): Promise<any> => {
        // TODO: 进队列，跟请求分开
        if (chatid) {
            this.conversation_id = chatid;
        } else {
            this.conversation_id = null;
            this.parent_message_id = getUUID();
        }
        console.log(prompts);
        await this.sseWithPrompts(prompts, callback);
        return true;
    }

    ask = async (prompt: string, callback: AskResultCallback): Promise<any> => {
        const result = await this.sendMessage(prompt, callback);
        return true;
    }

    covList = async (offset: number = 0, limit: number = 20) => {
        const data = await this.request<{
            items: any[],
        }>
        (
            `/backend-api/conversations?offset=${offset}&limit=${limit}`,
            "GET",
            {},
            await this.auth(),
        );
        return data.items;
    }

    // TODO: refract, move to adapter or prompt/
    private sendMessage = async (prompt, callback: AskResultCallback) => {
        if (text2tokenAndSplit(prompt).length < 1) {
            return null;
        }
        const tokenSplits = text2tokenAndSplit(prompt);
        console.log(tokenSplits, tokenSplits.length);
        await this.sseWithPrompts(tokenSplits, callback);
        console.log("ask end");
        callback({
            type: RequestText.END,
        })
    }

    private sseWithPrompts = async (prompt: string[], callback: (result: AskResult) => void) => {
        for (let split of prompt) {
            const auth_key = await this.auth();
            const sse = {
                on: true,
                callback,
            };
            const body = await this.getBodyOfSse(split);
            body['parent_message_id'] = this.parent_message_id;
            if (this.conversation_id) {
                body['conversation_id'] = this.conversation_id
            }
            console.log(body);

            const path = "/backend-api/conversation";
            const method = "POST";

            const {init, url} = this.requestPrepare(auth_key, method, body, path);
            // TODO: 超长处理
            // TODO: 重构
            console.debug("sse", url);
            console.debug(init);
            await fetchSSE(url, init, this.getOnMessage(sse));
        }
    }

    private getOnMessage = (sse: { callback: (result: AskResult) => void; on: boolean }) => {
        return (message: string) => {
            console.debug('sse message', message)
            if (message === '[DONE]') {
                sse.callback({
                    type: RequestText.DONE,
                })
            } else {
                try {
                    const data = JSON.parse(message)
                    const text = data.message?.content?.parts?.[0]
                    if (text) {
                        this.conversation_id = data.conversation_id
                        this.parent_message_id = data.message.id
                        sse.callback({
                            type: RequestText.ANS,
                            data: {
                                text,
                                messageId: data.message.id,
                                conversationId: data.conversation_id,
                            },
                        })
                    }
                } catch (err) {
                    console.error(err);
                    console.log(message);
                    return;
                }
            }
        };
    }

    private getBodyOfSse = async (split: string) => {
        return {
            action: 'next',
            messages: [
                {
                    id: getUUID(),
                    role: 'user',
                    content: {
                        content_type: 'text',
                        parts: [
                            split,
                        ],
                    },
                },
            ],
            model: await this.model(),
        };
    }

    private requestPrepare = (auth_key: string, method: string, body: ChatGPTBody, path: string) => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': this.host,
            'Referer': this.host,
            'X-Requested-With': 'XMLHttpRequest',
        };
        if (auth_key) {
            headers["authorization"] = `Bearer ${auth_key}`;
        }

        const init: RequestInit = {
            headers,
            method,
        }

        if (method === "POST" || method === "PUT") {
            init["body"] = JSON.stringify(body);
            console.log(body);
        }

        const url = `${this.host}${path}`;
        return {init, url};
    }
}
