import {getUUID} from "~utils/uuid";
import {fetchSSE} from "~utils/sse/sse";

export {}


/**
 * @description Visitor pattern for API
 *
 */
export interface API {
    auth(): Promise<string>;

    /**
     * @description Get model name
     */
    model(): Promise<string>;

    /**
     * @description Create a new conversation with prompt
     * @param prompt
     * @param callback callback function for SSE event [ans, end]
     */
    newCov(prompt: string, callback): Promise<string>;

    /**
     * @description Send prompt to API
     * @param conversation_id
     * @param parent_message_id
     * @param prompt
     * @param callback
     */
    ask(conversation_id: string, parent_message_id: string, prompt: string, callback);

    // TODO: title()
}

type Model = {
    "slug": string,
    "max_tokens": number,
    "title": string,
    "description": string,
    "tags": any[]
}

// TODO: handle unauthorized
//  {
//     "detail": {
//         "message": "Unauthorized - Access token is missing"
//     }
// }
export class ChatGPTAPI implements API {
    host: string = "https://chat.openai.com/";
    max_tokens: number = 4097;
    conversation_id: string;

    request = async <T>(path, method, body = {}, auth_key = "",
                        sse = {
                            on: false,
                            callback: ({
                                           type: string,
                                           data: any
                                       }) => {
                            }
                        }) => {
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
            // TODO: 重构
            console.debug("sse", url);
            console.debug(init);
            return await fetchSSE(url, init,
                (message: string) => {
                    console.debug('sse message', message)
                    if (message === '[DONE]') {
                        sse.callback({
                            type: 'end',
                            data: {},
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
                        console.error(err)
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
    newCov = async (prompt: string, callback): Promise<any> => {
        // TODO: check prompt length,
        //  auto split?
        console.log(prompt);
        return await this.sendMessage(prompt, callback, getUUID());
    }

    ask = (conversation_id: string, parent_message_id: string, prompt: string, callback): any => {
        return this.sendMessage(prompt, callback, parent_message_id, conversation_id);
    }

    private sendMessage = async (prompt, callback, parent_message_id, conversation_id=null) => {
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
