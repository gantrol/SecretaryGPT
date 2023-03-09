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
