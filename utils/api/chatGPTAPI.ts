// TODO: handle unauthorized
//  {
//     "detail": {
//         "message": "Unauthorized - Access token is missing"
//     }
// }
import {fetchSSE} from "~utils/sse/sse";
import {getUUID} from "~utils/uuid";
import type {API, AskResultCallback} from "~utils/api/api";
import {text2tokenAndSplit, tokensList2text} from "~utils/prompt/tokenize";
import {RequestText} from "~utils/constants";

type Model = {
    "slug": string,
    "max_tokens": number,
    "title": string,
    "description": string,
    "tags": any[]
}

export class ChatGPTAPI implements API {
    host: string = "https://chat.openai.com/";
    max_tokens: number = 4097;
    conversation_id: string;
    parent_message_id: string;

    request = async <T>(path, method, body = {}, auth_key = "") => {
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
        const response = await fetch(url, init);
        return response.json();


    }

    auth = async (): Promise<string> => {
        // TODO: cache
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
        console.log("newCov", prompt);
        return await this.ask(prompt, callback);
    }

    ask = async (prompt: string, callback: AskResultCallback): Promise<any> => {
        const result = await this.sendMessage(prompt, callback);
        return true;
    }

    private sendMessage = async (prompt, callback: AskResultCallback) => {
        if (text2tokenAndSplit(prompt).length < 1) {
            return true;
        }
        const tokenSplits = text2tokenAndSplit(prompt);
        console.log(tokenSplits, tokenSplits.length);
        for (let split of tokenSplits) {
            const auth_key = await this.auth();
            const sse = {
                on: true,
                callback,
            };
            const body = {
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
            }
            body['parent_message_id'] = this.parent_message_id;
            if (this.conversation_id) {
                body['conversation_id'] = this.conversation_id
            }
            console.log(body);

            const path = "/backend-api/conversation";
            const method = "POST";

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
            // TODO: 超长处理
            // TODO: 重构
            console.debug("sse", url);
            console.debug(init);
            await fetchSSE(url, init,
                (message: string) => {
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
                            return
                        }
                    }
                });
        }
        console.log("ask end")
        callback({
            type: RequestText.END,
        })
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
}
