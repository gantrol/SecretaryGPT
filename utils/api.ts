import {getUUID} from "~utils/uuid";
import {fetchSSE} from "~utils/sse/sse";

export {}


type AskResult = {
    type: "ans" | "end",
    data?: {
        text: string,
        messageId: string,
        conversationId: string,
    }
};


type AskResultCallback = (result: AskResult) => void

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
     * @param callback callback function
     *
     * @returns example: {
     *     "type": "ans",
     *     "data": {
     *         "text": "Sure, here's a classic one:\n\nWhy don't",
     *         "messageId": "...",
     *         "conversationId": "..."
     *     }
     * }
     */
    newCov(prompt: string, callback: AskResultCallback);

    /**
     * @description Send prompt to API
     * @param conversation_id
     * @param parent_message_id
     * @param prompt
     * @param callback
     */
    ask(conversation_id: string, parent_message_id: string, prompt: string, callback: AskResultCallback);

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
    newCov = async (prompt: string, callback: AskResultCallback): Promise<any> => {
        // TODO: check prompt length,
        //  auto split?
        console.log(prompt);
        return await this.sendMessage(prompt, callback, getUUID());
    }

    ask = (conversation_id: string, parent_message_id: string, prompt: string, callback: AskResultCallback): any => {
        return this.sendMessage(prompt, callback, parent_message_id, conversation_id);
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

export class BingAPI implements API {

    wss;
    conversation_id;
    private client_id: string;
    private conversation_signature: string;
    private invocation_id: number;
    private struct: object;

    DELIMITER = "\x1e";


    FORWARDED_IP = `1.36.8.9`
    // TODO: random  e.g.   f"13.{random.randint(104, 107)}.{random.randint(0, 255)}.{random.randint(0, 255)}"

    auth(): Promise<string> {
        // no used...?
        return Promise.resolve("");
    }

    model(): Promise<string> {
        return Promise.resolve("");
    }

    newCov = async (prompt: string, callback: AskResultCallback): Promise<string> => {
        const resp = await fetch("https://www.bing.com/turing/conversation/create", {
            "headers": {
                "accept": "application/json",
                "content-type": "application/json",
                "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-forwarded-for": this.FORWARDED_IP,
            },
            "referrer": "https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx",
            "referrerPolicy": "origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        if (resp.status !== 200) {
            throw new Error(`request Error, check login: ${resp.status}`);
        } else {
            this.invocation_id = 0;
            const data = await resp.json();
            try {
                if (data.result.value === "UnauthorizedRequest") {
                    throw new Error(`UnauthorizedRequest`);
                }
            } catch (e) {
                throw new Error(`request Error, check if in beta: ${e}`);
            }
            this.conversation_id = data.conversationId;
            this.client_id = data.clientId;
            this.conversation_signature = data.conversationSignature;
            // ask first question
            console.log(data);
            console.log(this);
            await this.ask(this.conversation_id, "", prompt, callback);
            return data;
        }
    }

    ask = async (conversation_id: string, parent_message_id: string, prompt: string, callback: AskResultCallback) => {
        // Ask a question to the bot
        // Check if websocket is closed
        if (this.wss && this.wss.closed || !this.wss) {
            this.wss = new WebSocket("wss://sydney.bing.com/sydney/ChatHub");
            console.log(this.wss);
            this.wss.onopen = async () => {
                await this.wss.send(this.append_identifier({"protocol": "json", "version": 1}))
                // await this.wss.
            }
        }
        let stage = 0;
        this.wss.onmessage = async (e) => {
            if (stage === 0) {
                this.update(prompt, "harmonyv3");
                // Send request
                const request = this.append_identifier(this.struct);
                console.log(request);
                await this.wss.send(request);
            }
            stage += 1;
            // TODO: modified to callback version
            let objects = `${e.data}`.split(this.DELIMITER);
            for (let obj of objects) {
                if (obj == null || obj == "") {
                } else {
                    let response = JSON.parse(obj);
                    const resp_type = response.type;
                    if (resp_type === 1) {
                        const message = response["arguments"][0]["messages"][0];
                        const text = message["adaptiveCards"][0]["body"][0]["text"];
                        // TODO: const suggestedResponses = message["suggestedResponses"];
                        console.log(obj);
                        callback({
                            type: "ans",
                            data: {
                                text: text,
                                messageId: message.messageId,
                                conversationId: this.conversation_id
                            }
                        })
                    } else if (resp_type === 2) {
                        console.log("end");
                        console.log(obj);
                        callback({
                            type: "end",
                        })
                    } else {
                        // ignore type 6 or other
                    }
                }

            }
        }
        // TODO: conversation_style as options?
        return true;
    }


    private append_identifier(msg: object) {
        return `${JSON.stringify(msg)}${this.DELIMITER}`;
    }

    private update(
        prompt, // str
        conversation_style, // CONVERSATION_STYLE_TYPE
        options = null // Optional[list]
    ) {
        if (options === null) {
            options = [
                "deepleo",
                "enable_debug_commands",
                "disable_emoji_spoken_text",
                "enablemm"
            ];
        }

        this.struct = {
            arguments: [
                {
                    source: "cib",
                    optionsSets: options,
                    isStartOfSession: this.invocation_id === 0,
                    message: {
                        author: "user",
                        inputMethod: "Keyboard",
                        text: prompt,
                        messageType: "Chat"
                    },
                    conversationSignature: this.conversation_signature,
                    participant: {
                        id: this.client_id
                    },
                    conversationId: this.conversation_id,
                },
            ],
            "invocationId": `${this.invocation_id}`,
            "target": "chat",
            "type": 4,
        }
        this.invocation_id += 1
    }
}

