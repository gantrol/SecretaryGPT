import type {RequestText} from "~utils/constants";


export type AskResult = {
    type: typeof RequestText.ANS | typeof RequestText.DONE,
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
    // TODO: queue (just gpt for now)

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
     * @param prompt
     * @param callback
     */
    ask(prompt: string, callback: AskResultCallback);

    // TODO: title()

    askAll (prompts: string[], chatid, callback: AskResultCallback);
}



