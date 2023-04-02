import {chatTypes} from "~utils/constants";
import type {API} from "~utils/api/api";
import {ChatGPTAPI} from "~utils/api/chatGPTAPI";

let chatAPI: API;

const init = () => {
    chatAPI = new ChatGPTAPI();
}

init();

// TODO: bing的要重新设计？会话会乱。
const chat = async (prompt: string, callback, chatType, conversation_id: string = "",
                    parent_message_id: string = "") => {
    let api: API;
    if (chatType === chatTypes.ChatGPT) {
        api = chatAPI;
    } else {
        throw new Error("chatType error: no chat type of " + chatType);
    }
    // TODO: 重构...
    if (conversation_id && parent_message_id) {
        await api.ask(
            prompt,
            callback
        );
    } else {
        await api.newCov(
            prompt,
            callback
        );
    }
}

const newCov = async (prompt: string, tabid, chatType) => {
    return chat(prompt, getCallback(chatType, tabid), chatType);
}

const getCallback = (chatType, tabid) => {
    return (data) => {
        data.chatType = chatType;
        if (chatType === chatTypes.Bing) {
            console.log(data);
        }
        chrome.tabs.sendMessage(tabid, data);
    };
}

const ask = async (prompt: string, conversation_id: string, parent_message_id: string, tabid, chatType) => {
    return chat(prompt, getCallback(chatType, tabid), chatType, conversation_id, parent_message_id);
}

function bulkSend(prompts, chatType, conversation_id, tabid) {
    return chatAPI.askAll(prompts, conversation_id, getCallback(chatType, tabid));
}

chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        console.debug(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.type === 'newCov') {
            await newCov(request.body.prompt, sender.tab.id, request.body.chatType);
        } else if (request.type === 'sendMsg') {
            const body = request.body;
            ask(body.prompt, body.conversation_id, body.parent_message_id, sender.tab.id, body.chatType);
        } else if (request.type === 'bulkSend') {
            const body = request.body;
            bulkSend(body.prompts, body.chatType, body.conversation_id, sender.tab.id);
        }
        sendResponse({status: 'ok'});
        return true;
    }
);
