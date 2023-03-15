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

    request = async <T>(path, method, body = {}, auth_key = "",
                        sse: {
                            on: boolean,
                            callback: AskResultCallback
                        } = {
                            on: false,
                            callback: () => {
                            }
                        }
    ) => {
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

        if (!sse.on) {
            const response = await fetch(url, init);
            return response.json();
        } else {
            // TODO: 超长处理
            // TODO: 重构
            console.debug("sse", url);
            console.debug(init);
            return await fetchSSE(url, init,
                (message: string) => {
                    console.debug('sse message', message)
                    if (message === '[DONE]') {
                        sse.callback({
                            type: 'end',
                        })
                        return
                    }
                    try {
                        const data = JSON.parse(message)
                        const text = data.message?.content?.parts?.[0]
                        if (text) {
                            this.conversation_id = data.conversation_id
                            sse.callback({
                                type: 'ans',
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
                },
            )
        }

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
        }>("backend-api/models", "GET");
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
        if (text2tokenAndSplit(prompt).length === 1) {
            console.log(prompt);
            return await this.sendMessage(prompt, callback, getUUID());
        } else {
            const tokenSplits = text2tokenAndSplit(prompt);
            const responses = await Promise.all(tokenSplits.map(split => this.sendMessage(split, callback, getUUID())));
            return tokensList2text(responses.map(response => response.result.text));
        }
    }

    ask = async (conversation_id: string, parent_message_id: string, prompt: string, callback: AskResultCallback): Promise<any> => {
        if (text2tokenAndSplit(prompt).length === 1) {
            return this.sendMessage(prompt, callback, parent_message_id, conversation_id);
        } else {
            const tokenSplits = text2tokenAndSplit(prompt);
            const responses = await Promise.all(tokenSplits.map(split =>
                this.sendMessage(split, callback, parent_message_id, conversation_id)));
            return tokensList2text(responses.map(response => response.result.text));
        }
    }

    private sendMessage = async (prompt, callback: AskResultCallback, parent_message_id, conversation_id = null) => {
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
                            prompt,
                        ],
                    },
                },
            ],
            model: await this.model(),
            parent_message_id: parent_message_id,
        }
        if (conversation_id) {
            body['conversation_id'] = conversation_id
        }
        console.log(body);
        return await this.request<{
            id: string,
        }>(
            "/backend-api/conversation",
            "POST",
            body,
            auth_key,
            sse,
        );
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
