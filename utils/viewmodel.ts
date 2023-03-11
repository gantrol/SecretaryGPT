import {chatTypes, languageI18n, messagesInit, modeKeys} from "~utils/constants";


export class ChatViewModel {
    mode: string = modeKeys.NONE;
    language: string = languageI18n.NONE;
    newMessage: { id: number, author: string, text: string };
    messages = messagesInit;
    ChatID: string;
    isSending: boolean = false;
    // TODO: time?
    isLogin: boolean = false;
    chatType: string = chatTypes.ChatGPT;
    constructor(chatType) {
        this.chatType = chatType;
    }

    renew = (chatType) => {
        this.chatType = chatType;
        this.ChatID = null;
        this.isSending = false;
        this.messages = messagesInit;
        this.newMessage = null;
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
        let prefix = '';
        if (this.mode === modeKeys.EXPLAIN) {
            prefix = `请根据下面的片段，推断写作者是什么角色。并模仿这类角色做出解释`;
        } else if (this.mode === modeKeys.SUMMARY) {
            prefix = `请根据下面的片段，做出总结，注意内容可能涉及多人、也可能只是单人`;
        }
        if (prefix) {
            prefix = `${prefix}: \n\n`;
        }

        message = `${prefix}${message}`;

        // language value
        if (this.language && this.language !== languageI18n.NONE) {
            message = `${message}\n\n请用${this.language}回答`;
        }

        return message;
    }

}