import {BingAPI, ChatGPTAPI} from "~utils/api";
import type {API} from "~utils/api";
import {chatTypes} from "~utils/constants";

export {}
let chatAPI: API;
let bingAPI: API;


const init = () => {
    chatAPI = new ChatGPTAPI();
    bingAPI = new BingAPI();
}

init();

// TODO: bing的要重新设计？会话会乱。
const chat = async (prompt: string, callback, chatType, conversation_id: string = "",
                    parent_message_id: string = "") => {
    let api: API;
    if (chatType === chatTypes.ChatGPT) {
        api = chatAPI;
    } else if (chatType === chatTypes.Bing) {
        api = bingAPI
    } else {
        throw new Error("chatType error: no chat type of " + chatType);
    }
    if (conversation_id && parent_message_id) {
        await api.ask(
            conversation_id,
            parent_message_id,
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
        console.log(data);
        if (data.type === 'ans') {
            chrome.tabs.sendMessage(tabid, data);
        } else if (data.type === 'end') {
            chrome.tabs.sendMessage(tabid, data);
        }
    };
}

const ask = async (prompt: string, conversation_id: string, parent_message_id: string, tabid, chatType) => {
    return chat(prompt, getCallback(chatType, tabid), chatType, conversation_id, parent_message_id);
}

chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        console.debug(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.type === 'newCov') {
            await newCov(request.body.prompt, sender.tab.id, request.body.chatType);
            sendResponse({status: 'ok'});
        } else if (request.type === 'sendMsg') {
            const body = request.body;
            ask(body.prompt, body.conversation_id, body.parent_message_id, sender.tab.id, body.chatType);
        }
        return true;
    }
);
