// for jest : https://stackoverflow.com/a/73901870
import {describe} from "@jest/globals";

const TextEncoder = require('util').TextEncoder;
global.TextEncoder = TextEncoder;

const TextDecoder = require('util').TextEncoder;
global.TextDecoder = TextDecoder;

import {BilibiliAdapter, Subtitle} from "./bilibili";

import * as fs from 'fs';


const loadExampleJson = (file_name): Subtitle => {
    const jsonString = fs.readFileSync(`./assets/test_asset/${file_name}`, 'utf-8');
    const jsonData: Subtitle = JSON.parse(jsonString);
    return jsonData;
}

// TODO: load large json file

// load json from ./test_asset/example_middle_en.json
const example_short_en_json = loadExampleJson('example_short_en.json');
const example_middle_en_json = loadExampleJson('example_middle_en.json');
const example_long_en_json = loadExampleJson('example_long_en.json');

const example_short_zh_json = loadExampleJson('example_short_zh.json');
const example_long_zh_json = loadExampleJson('example_long_zh.json');

describe('test subtitleSplitText', () => {
    test('test subtitleSplitText short zh', () => {
        const bba = new BilibiliAdapter("");
        bba.lang = "中文"
        const result = bba.subtitleSplitText(example_short_zh_json);
        expect(result).toEqual([
            '总结以下这段视频的部分字幕，请注意一共有1个部分。\n'
            + '请用中文表达。字幕的第一部分是\n'
            + '在这里雄心勃勃\n' + '我真的在努力让模特通过测试\n' + '我们要试试Q\n' + '如果你想一下这个\n' + '我想让观众真正思考\n' + '你如何做一篇以Q开头的文章摘要\n' + '不容易\n' + '挺好的\n' + '那很好\n' + '所有的权利\n' + '我已经向你展示了一篇现有文章的总结\n' + '我想向你展示如何灵活地将不同文章之间的想法结合起来\n' + '所以我要把昨天黑客新闻上的这篇文章\n' + '复制粘贴并进行相同的对话\n' + '所以它有我们刚刚做的所有背景\n' + '我要说\n' + '在本文和GP Four博客之间找到一个共同的主题\n' + '所以这是一篇关于松果的文章\n' + '它是一个Python Web应用程序开发框架\n' + '它使这项技术更容易获得\n' + '用户友好\n' + '如果你认为这还不够有洞察力\n'
            + "你总是可以给出一些反馈，说这没有洞察力。这部分总结请用[0.12-68.22]开头。"]);
    });

    test('test subtitleSplitText middle en', () => {
        const bba = new BilibiliAdapter("");
        bba.lang = "中文"
        const result = bba.subtitleSplitText(example_middle_en_json);
        expect(result.length).toEqual(2);
        expect(result[1]).toEqual(
            "请用中文总结以下这段视频的部分字幕，字幕第2部分如下：\n" +
            "A beautiful, beautiful poem about doing your taxes.\n" +
            "So thank you, everyone, for tuning in.\nI hope you learned something about what the model can do,\nhow to work with it.\nAnd honestly, we're just really excited to see\n" +
            "what you're going to build.\n" +
            "I've talked about OpenAI evals.\n" +
            "Please contribute.\n" +
            "We think that this model, improving it,\n" +
            "bringing it to the next level, is something\n" +
            "that everyone can contribute to.\n" +
            "And we think it can really benefit a lot of people.\n" +
            "And we want your help to do that.\n" +
            "So thank you very much.\n" +
            "We're so excited to see what you're going to build.\n" +
            "Thank you.。这部分总结请用[1188.8-1189.8]开头。"
        );
    });
// TODO: test longer json file
    test('test subtitleSplitText long zh', () => {
        const bba = new BilibiliAdapter("");
        bba.lang = "中文"
        const result = bba.subtitleSplitText(example_long_zh_json);
        expect(result[2]).toContain("请用中文总结以下这段视频的部分字幕，字幕第3部分如下：")
        expect(result[2]).toContain("这部分总结请用[1128.74-1130.36]开头。")
        expect(result.length).toEqual(4);
        expect(result[result.length - 1]).toEqual(
            "请用中文总结你上述3部分回答。这部分总结请用[0.12-1130.36]开头。"
        )
    });

});
