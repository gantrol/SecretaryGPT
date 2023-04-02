import {describe} from "@jest/globals";
const TextEncoder = require('util').TextEncoder;
global.TextEncoder = TextEncoder;

const TextDecoder = require('util').TextEncoder;
global.TextDecoder = TextDecoder;
import fs from "fs";

import {NormalAdapter} from "~utils/adapter/normal";
import {chatTypes, languageI18n} from "~utils/constants";
import {RefineAdapter} from "~utils/adapter/refine";
import {SummaryAdapter} from "~utils/adapter/summary";
import {ExplainAdapter} from "~utils/adapter/explain";



const loadExampleText = (file_name): string => {
    return fs.readFileSync(`./assets/test_asset/${file_name}`, 'utf-8');
}

const example_long_en_txt = loadExampleText('example_long_en.txt');
const example_long_zh_txt = loadExampleText('example_long_zh.txt');

describe('test multipartTextAdapter', () => {
    test('normal en', () => {
        const adapter = new NormalAdapter();
        const strings = adapter.splitText(example_long_en_txt);
        expect(strings[strings.length - 1]).toContain(`We're so excited to see what you're going to build.`);
        expect(strings.length).toEqual(2);
    })

    test('normal zh', () => {
        const adapter = new NormalAdapter(chatTypes.ChatGPT, languageI18n.ZH);
        const strings = adapter.splitText(example_long_zh_txt);
        expect(strings[strings.length - 1]).toContain(" rely by 中文");
        expect(strings.length).toEqual(3);
    });

    test('refine zh', () => {
        const adapter = new RefineAdapter(chatTypes.ChatGPT, languageI18n.ZH);
        const strings = adapter.promptList(example_long_zh_txt);
        const count = 5;
        expect(strings[strings.length - 1]).toContain(`Here is the part ${count} to review and proofread by 中文`);
        expect(strings.length).toEqual(count);
    });

    test('refine en', () => {
        const adapter = new RefineAdapter(chatTypes.ChatGPT, languageI18n.EN);
        const strings = adapter.promptList(example_long_en_txt);
        const count = 2;
        expect(strings[strings.length - 1]).toContain(`Here is the part ${count} to review and proofread by English`);
        expect(strings.length).toEqual(count);
    });

    test('summary zh', () => {
        const adapter = new SummaryAdapter(chatTypes.ChatGPT, languageI18n.ZH);
        const strings = adapter.splitText(example_long_zh_txt);
        expect(strings[strings.length - 1]).toContain("Here is the part 3 to summary");
        expect(strings[strings.length - 1]).toContain("Answer by 中文");
        expect(strings.length).toEqual(3);
    });

    test('summary en', () => {
        const adapter = new SummaryAdapter(chatTypes.ChatGPT, languageI18n.EN);
        const strings = adapter.splitText(example_long_en_txt);
        const count = 2
        expect(strings[0]).toContain(adapter.FirstPartPromptPrefix(count))
        expect(strings[strings.length - 1]).toContain("Here is the part 2 to summary");
        expect(strings[strings.length - 1]).toContain("Answer by English");
        expect(strings.length).toEqual(count);
    });

    test('explain zh', () => {
        const adapter = new ExplainAdapter(chatTypes.ChatGPT, languageI18n.ZH);
        const strings = adapter.splitText(example_long_zh_txt);
        expect(strings[strings.length - 1]).toContain("Here is the part 3 to explain by 中文");
        expect(strings.length).toEqual(3);
    });

    test('explain en', () => {
        const adapter = new ExplainAdapter(chatTypes.ChatGPT, languageI18n.EN);
        const strings = adapter.splitText(example_long_en_txt);
        const count = 2
        expect(strings[0]).toContain(adapter.FirstPartPromptPrefix(count))
        expect(strings[strings.length - 1]).toContain(`Here is the part ${count} to explain by English`);
        expect(strings.length).toEqual(count);
    });
});
