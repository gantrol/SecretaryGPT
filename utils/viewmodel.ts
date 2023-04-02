import {chatTypes, languageI18n, messagesInit, modeKeys, RequestText} from "~utils/constants";
import {log2} from "~utils/log";
import type {MultipartTextAdapter} from "~utils/adapter/multipartTextAdapter";
import {RefineAdapter} from "~utils/adapter/refine";
import {ExplainAdapter} from "~utils/adapter/explain";
import {SummaryAdapter} from "~utils/adapter/summary";
import {NormalAdapter} from "~utils/adapter/normal";

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


    handleMessage = (message) : string[] => {
        // mode value
        // TODO: i18n？
        // TODO: 弄一个Adapter...

        let messages: string[];
        let adapter: MultipartTextAdapter;
        if (this.mode === modeKeys.EXPLAIN) {
            adapter = new ExplainAdapter(this.chatType, this.language);
        } else if (this.mode === modeKeys.SUMMARY) {
            adapter = new SummaryAdapter(this.chatType, this.language);
        } else if (this.mode === modeKeys.REFINE) {
            // TODO: Max_token 给到界面配置
            adapter = new RefineAdapter(this.chatType, this.language);
            adapter.MAX_TOKENS = 1500;
        } else {
            adapter = new NormalAdapter(this.chatType, this.language)
        }

        messages = adapter.promptList(message, adapter.MAX_TOKENS)

        return messages;
    }

    _helper = async (callback) => {
        if (!this.typingMessage || this.isSending) return;

        const prompts = this.handleMessage(this.typingMessage);
        this.messages = this.messages.concat({
            author: 'user',
            text: this.typingMessage,
        });
        callback()
        this.bulkSendPrompts(prompts, callback);
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
