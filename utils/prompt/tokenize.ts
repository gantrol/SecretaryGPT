const gpt3 = require('gpt-3-encoder');
// TODO: 配置到API
export const MAX_TOKENS = 4096;
export const SPLIT_TOKEN = 4000;

const encode = (text: string): number[] => {
    return gpt3.encode(text);
}

export const tokenCount = (text: string): number => {
    return encode(text).length;
}

/**
 *
 * @param text assume it contains prefix string, assert text is not over limit
 * @param addText text to be added
 * @param limit
 */
export const addStringAvoidOverLimit = (text: string, addText: string, limit = SPLIT_TOKEN, sep="\n"
): [boolean, string] => {
    const result = `${text}${sep}${addText}`;
    if (isOverLimit(result, limit)) {
        return [false, text];
    } else {
        return [true, result];
    }
}

export const isOverLimit = (text: string, limit = MAX_TOKENS): boolean => {
    return tokenCount(text) > limit;
}

// TODO: limit
export const text2tokenAndSplit = (text: string, limit = MAX_TOKENS): string[] => {
    const tokens = encode(text);
    if (tokens.length <= limit) {
        return [text];
    } else {
        let count = Math.ceil(tokens.length / SPLIT_TOKEN);
        let amount = Math.ceil(text.length / count);
        const result: string[] = [];
        let start = 0;
        let remain = text.length
        while (start < remain && count > 1) {
            const tmp = text.slice(start, start + amount);
            result.push(tmp);
            start += amount;
            count -= 1;
        }
        result.push(text.slice(start));
        return result;
    }
}

export const tokensList2text = (texts: string[]): string => {
    return texts.join('');
}
