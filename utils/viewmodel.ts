import {chatTypes, languageI18n, modeKeys} from "~utils/constants";


export class ChatViewModel {
    mode: string = modeKeys.NONE;
    language: string = languageI18n.NONE;
    newMessage: { id: number, author: string, text: string };
    messages = [
        {
            id: 1,
            author: "bot",
            text: "你好，我是小助手，我可以帮你写作业。"
        }, {
            id: 2,
            author: "user",
            text: "你好，写作业的，不要。"
        }, {
            id: 3,
            author: "bot",
            text: "好的，再见"
        },
    ];
    ChatID: string;
    isSending: boolean = false;
    // TODO: time?
    isLogin: boolean = false;
    chatType: string = chatTypes.ChatGPT;
    constructor(chatType) {
        this.chatType = chatType;
    }
    sendMsg = async (message) => {
        if (!message || this.isSending) return;

        message = this.handleMessage(message);
        this.isSending = true;

        if (this.ChatID) {
            chrome.runtime.sendMessage({
                type: 'sendMsg',
                body: {
                    prompt: message,
                    conversation_id: this.ChatID,
                    parent_message_id: this.messages[this.messages.length - 2].id,  // 上一个回复在倒数第二个
                    chatType: this.chatType,
                }
            });
        } else {
            chrome.runtime.sendMessage({
                type: 'newCov',
                body: {
                    prompt: message,
                    chatType: this.chatType,
                }
            });
        }

    }

    handleMessage = (message) => {
        // mode value
        // TODO: i18n？
        if (this.mode === modeKeys.EXPLAIN) {
            message = `请根据下面的片段，推断写作者是什么角色。并模仿这类角色做出解释：\n\n${message}`;
        } else if (this.mode === modeKeys.SUMMARY) {
            message = `请根据下面的片段，总结写作者的观点：\n\n${message}`;
        }

        // language value
        if (this.language && this.language !== languageI18n.NONE) {
            message = `${message}, 请用${this.language}回答`;
        }
        return message;
    }

}
