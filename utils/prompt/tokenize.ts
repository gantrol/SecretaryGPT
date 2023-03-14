import {encode, decode} from 'gpt-3-encoder'

const MAX_TOKENS = 4096;

const SPLIT_TOKEN = 4000;

const CHINESE_SPLIT_WORD = 1500;

export const text2tokenAndSplit = (text: string): number[][] => {
    const tokens = encode(text);
    let count = Math.ceil(tokens.length / SPLIT_TOKEN);
    let amount = Math.ceil(text.length / count);
    const result: number[][] = [];
    let start = 0;
    let remain = text.length
    while (start < remain && count > 1) {
        const tmp = text.slice(start, start + amount);
        console.log(tmp);
        result.push(encode(tmp));
        start += amount;
        count -= 1;
    }
    result.push(encode(text.slice(start)));
    return result;
}

export const tokensList2text = (tokensList: number[][]): string => {
    const textList = tokensList.map(tokens => decode(tokens));
    return textList.join('');
}
