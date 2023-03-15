const getText = chrome.i18n.getMessage;


const objectMap = (object, map) => {
    return Object.keys(object).reduce(function(result, key) {
        result[key] = map(object[key]);
        return result;
    }, {});
};


export const AllLanguage = getText("chat_language_all");

export const languageI18n = {
    // 列出常用语言
    NONE: AllLanguage,
    EN: "English",
    ZH: "中文",
}

export const modeKeys = {
    NONE: "chat_mode_none",
    EXPLAIN: "chat_mode_explain",
    SUMMARY: "chat_mode_summary",
}
export const modeValues = objectMap(modeKeys, getText);

export const chatTypes = {
    // TODO：存储
    ChatGPT: "ChatGPT",
    Bing: "Bing",
}

export const LinkType = {
    BING: "bing",
    INNER: "inner"
};


export const messagesInit = [
    // {
    //     id: 1,
    //     author: "bot",
    //     text: "你好，我是小助手，我可以帮你写作业。"
    // }, {
    //     id: 2,
    //     author: "user",
    //     text: "你好，写作业的，不要。"
    // }, {
    //     id: 3,
    //     author: "bot",
    //     text: "好的，再见"
    // }, {
    //     id: 4,
    //     author: "user",
    //     text: "请你根据如下描述，判断说话者的角色，并模仿这种角色用中文表述这个插件的功能。\n" +
    //         "\n" +
    //         "https://github.com/gantrol/SecretaryGPT 这个浏览器插件，可以在侧边栏跟必应或ChatGPT聊天，也可以在单独的页面同时对比两个机器人的聊天\n" +
    //         "\n" +
    //         "根据描述，说话者的角色是一个介绍者或推荐者。该插件是一个浏览器插件，它可以在侧边栏中与必应或ChatGPT聊天，并且还可以在单独的页面中同时比较两个机器人的聊天。\n" +
    //         "\n" +
    //         "这个插件的功能非常强大，它让你可以快速方便地测试和比较两个不同机器人的聊天能力，而且它还支持与必应或ChatGPT进行聊天，让你在浏览网页时也能得到有趣的回答和建议。如果你对人工智能和聊天机器人有兴趣，那么这个插件一定会是你的不二选择。\n" +
    //         "\n" +
    //         "请从开发者的角度，介绍这款软件\n" +
    //         "\n" +
    //         "这款软件是一个浏览器插件，名称为 SecretaryGPT，主要功能是通过集成必应或ChatGPT等机器人，提供了一个简单的用户界面，让用户可以方便地与机器人进行聊天交互。\n" +
    //         "\n" +
    //         "作为开发者，我们使用了Web技术（如HTML、CSS和JavaScript）和机器人API来开发这个插件。它使用了一些现代的前端框架和库，例如React、Redux和Semantic UI，以提高用户体验和插件的可维护性。\n" +
    //         "\n" +
    //         "除此之外，这个插件还提供了一个“对比聊天”的功能，它能够在单独的页面中同时比较两个机器人的聊天，让用户可以更加直观地了解不同机器人之间的差异和优缺点。\n" +
    //         "\n" +
    //         "最后，我们还为这个插件编写了详细的文档和使用说明，以便用户能够更好地了解插件的使用和配置。我们会不断更新和改进这个插件，以提供更好的用户体验和更强大的功能。"
    // }
]

export const Settings = {
    debug: "setting_debug",
    alwaysOpen: "setting_always_open",
}

const popupPageI18nKey = {
    isAlwaysOpenedSetting: "setting_always_open",
    isDebugModeSetting: "setting_debug",
}
export const popupPageI18nValue = objectMap(popupPageI18nKey, getText);

export const URLS = {
    chatsVS: chrome.runtime.getURL("/tabs/chatsVS.html"),
    jike: chrome.runtime.getURL("/tabs/jike.html"),
}

export const RequestText = {
    ANS: "ans",
    DONE: "done", // 一段话的结束
    END: "end",  //  一段话或多段话结束
}
