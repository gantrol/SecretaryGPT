import type {API, AskResultCallback} from "~utils/api/api";
import {RequestText} from "~utils/constants";

export class BingAPI implements API {

    wss;
    conversation_id;
    private client_id: string;
    private conversation_signature: string;
    private invocation_id: number;
    private struct: object;

    DELIMITER = "\x1e";


    // FORWARDED_IP = `1.36.8.9`

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
                // "x-forwarded-for": this.FORWARDED_IP,
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
            if (data.result.value === "UnauthorizedRequest") {
                throw new Error(`UnauthorizedRequest, check if your account in beta: ${data.result}`);
            }
            this.conversation_id = data.conversationId;
            this.client_id = data.clientId;
            this.conversation_signature = data.conversationSignature;
            // ask first question
            console.log(data);
            console.log(this);
            await this.ask(prompt, callback);
            return data;
        }
    }

    // TODO: fix "Conversation '51D|BingProd|xxx' doesn't exist or has expired. Conversations expire after 06:00:00 minutes."
    ask = async (prompt: string, callback: AskResultCallback) => {
        // Ask a question to the bot
        // Check if websocket is closed
        if (this.wss && this.wss.closed || !this.wss) {
            this.wss = new WebSocket("wss://sydney.bing.com/sydney/ChatHub");
            console.log(this.wss);
            this.wss.onopen = async () => {
                this.update(prompt, "harmonyv3");
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
                        console.log(RequestText.DONE);
                        console.log(obj);
                        callback({
                            type: RequestText.DONE,
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

    askAll(prompts: string[], callback: AskResultCallback) {
        new Error("Not implemented");
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
                    // TODO: fix, 有时候会没有？
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
