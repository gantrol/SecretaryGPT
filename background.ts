import {ChatGPTAPI} from "~utils/api";
import type {API} from "~utils/api";

export {}
let api: API;
let id: string;


const init = async () => {
    api = new ChatGPTAPI();
}

init();


const chat = async (prompt: string, callback, conversation_id: string = "") => {
    if (conversation_id) {
        // TODO:
    } else {
        await api.newCov(
            prompt,
            callback
        );
    }
}

const newCov = async (prompt: string, tabid) => {
    return chat(prompt, (data) => {
        console.log(data);
        if (data.type === 'ans') {
            chrome.tabs.sendMessage(tabid, data);
        } else if (data.type === 'end') {
            chrome.tabs.sendMessage(tabid, data);
        }
    });
}

chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        console.debug(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.type === 'newCov') {
            // console.log(request);
            await newCov(request.body.prompt, sender.tab.id);
            sendResponse({status: 'ok'});
        } else if (request.type === 'sendMsg') {
            chat(request.prompt, request.callback, request.conversation_id)
        }
        return true;
    }
);
