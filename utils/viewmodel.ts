import {chatTypes, languageI18n, messagesInit, modeKeys, RequestText} from "~utils/constants";
import {log2} from "~utils/log";

export class ChatViewModel {
    // TODO: 重构
    mode: string = modeKeys.NONE;
    language: string = languageI18n.NONE;
    newMessage: { id: number, author: string, text: string };
    messages = [];
    ChatID: string;
    isSending: boolean = false;
    isLogin: boolean = false;
    chatType: string;
    typingMessage = "";

    constructor(chatType = chatTypes.ChatGPT) {
        this.chatType = chatType;
    }

        initListener = (callback) => {
        chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
            if (request.type === RequestText.ANS && request.chatType === this.chatType) {
                const data = request.data;
                this.newMessage = {
                    id: data.messageId,
                    author: "bot",
                    text: data.text,
                }
                // console.log(data);

                this.ChatID = data.conversationId;
            } else if (request.type === RequestText.DONE && request.chatType === this.chatType) {
                console.log(RequestText.DONE);
                if (this.newMessage) {
                    this.messages = this.messages.concat(this.newMessage);
                    this.newMessage = null;
                } else {
                    this.messages = this.messages.concat({
                        author: 'bot',
                        text: `请求${this.chatType}出错，请检查是否登录`,
                    });
                }
            } else if (request.type === RequestText.END && request.chatType === this.chatType) {
                console.log(RequestText.END);
                this.isSending = false;
            }
            callback();
        });
    }

    renew = (chatType = this.chatType) => {
        this.chatType = chatType;
        this.ChatID = null;
        this.isSending = false;
        this.messages = messagesInit;
        this.newMessage = null;
    }

    sendMsg = async (message) => {

        this.isSending = true;

        if (this.ChatID) {
            chrome.runtime.sendMessage({
                type: 'sendMsg',
                body: {
                    prompt: message,
                    // TODO: 不需要下面俩？只需要一个判断是new，还是ask的标志？还是说后续可以选择conversation_id
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
        // TODO: 弄一个Adapter...
        let prefix = '';
        if (this.mode === modeKeys.EXPLAIN) {
            prefix = `请根据下面的片段，推断写作者是什么角色。并模仿这类角色做出解释`;
        } else if (this.mode === modeKeys.SUMMARY) {
            prefix = `请根据下面的片段，做出总结要求长度至多为原来的十分之一。注意内容可能涉及多人、也可能只是单人。请注意内容后续内容都需要总结`;
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

    _helper = async (callback) => {
        if (!this.typingMessage || this.isSending) return;

        // TODO: handle longer messages
        const message = this.handleMessage(this.typingMessage);
        this.messages = this.messages.concat({
            author: 'user',
            text: this.typingMessage,
        });
        callback()
        await this.sendMsg(message);
        this.typingMessage = '';
    }

    handleKeydown = async (event, callback) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();
            await this._helper(callback);
        }
        callback();
    }

    sendOnclick = async (_event, callback) => {
        await this._helper(callback);
        callback();
    }

    sendAuto = async (message, callback) => {
        this.typingMessage = message;
        await this._helper(callback);
        callback();
    }

    bulkSendPrompts = async (prompts, callback) => {
        if (chatTypes.ChatGPT === this.chatType) {
            // send prompts
            console.log("bulkSend", 'content script to background script')
            // TODO: add bulkSend to constant?
            chrome.runtime.sendMessage({
                type: 'bulkSend',
                body: {
                    prompts: prompts,
                    chatType: this.chatType,
                    conversation_id: this.ChatID,
                }
            });
            callback();
        } else {
            new Error(`暂不支持${this.chatType}批量发送`);
        }
    }
}

export class SidebarViewModel {
    width: number;
    min_width: number = window.screen.width * 0.2;
    max_width: number = window.screen.width * 0.8;
    grabberWidth = 6
    expanding = null;
    start = null;
    initial = null;

    constructor(width) {
        this.width = width;
    }

    startResizeWidth = (event, type = 'left') => {
        log2('startResizeWidth')
        this.expanding = type;
        this.start = event.pageX;
        this.initial = this.width;
    }

    stopResizeWidth = () => {
        this.expanding = null;
        this.start = null;
        this.initial = null;
    }

    handleResizeWidth = (event, callback) => {
        if (!this.expanding) return false

        if (this.expanding == 'left') {
            const delta = this.start - event.pageX
            // x = this.initial.x - delta
            this.width = Math.max(this.initial + delta, this.min_width);
            this.width = Math.min(this.width, this.max_width);
            return false
        }

        if (this.expanding == 'right') {
            const delta = event.pageX - this.start
            this.width = this.initial + delta
            return false
        }
    }

    isLeft = () => {
        return this.expanding === 'left';
    }
}
