export {}


type AskResult = {
    type: "ans" | "end",
    data?: {
        text: string,
        messageId: string,
        conversationId: string,
    }
};


export type AskResultCallback = (result: AskResult) => void

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



