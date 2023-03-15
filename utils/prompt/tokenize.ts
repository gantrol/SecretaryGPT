const gpt3 = require('gpt-3-encoder');
const MAX_TOKENS = 4096;
const SPLIT_TOKEN = 4000;

const encode = (text: string): number[] => {
    return gpt3.encode(text);
}

export const tokenCount = (text: string): number => {
    return encode(text).length;
}

export const text2tokenAndSplit = (text: string): string[] => {
    const tokens = encode(text);
    if (tokens.length <= MAX_TOKENS) {
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
