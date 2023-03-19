import type {Adapter} from "~utils/adapter/adapter";
import {
    addStringAvoidOverLimit,
    isOverLimit, MAX_TOKENS,
    text2tokenAndSplit,
    tokenCount
} from "~utils/prompt/tokenize";
import {chatTypes} from "~utils/constants";

interface Subtitle {
    font_size: number;
    font_color: string;
    background_alpha: number;
    background_color: string;
    Stroke: string;
    body: {
        from: number;
        to: number;
        location: number;
        content: string;
    }[];
}

// TODO: 链接？
export class BilibiliAdapter implements Adapter {
    private prompts: string[];
    private api: string;
    set lang(value: string) {
        this._lang = value;
    }
    private page_text: string;
    private subtitles: { name: string; url: string }[];
    private _currentSelect: string;

    private firstPartLimit;
    private secondPartLimit;
    private endPartLimit;
    private _lang = "中文";
    set currentSelect(value: string) {
        this._currentSelect = value;
    }

    private PLAY_HOLDER_NUMBER = Number.MAX_SAFE_INTEGER
    constructor(page_text: string, api = chatTypes.ChatGPT) {
        this.page_text = page_text;
        this.firstPartLimit = MAX_TOKENS - tokenCount(
            `${BilibiliAdapter.promptFirstPartTemplate("", "", 
                this.PLAY_HOLDER_NUMBER, this.PLAY_HOLDER_NUMBER)}
                ${BilibiliAdapter.FirstPartPromptPrefix(this.PLAY_HOLDER_NUMBER)}`
        )
        this.secondPartLimit = MAX_TOKENS - tokenCount(BilibiliAdapter.promptMiddlePartTemplate("", "",
            this.PLAY_HOLDER_NUMBER, this.PLAY_HOLDER_NUMBER, this.PLAY_HOLDER_NUMBER))
        this.endPartLimit = MAX_TOKENS - tokenCount(BilibiliAdapter.promptFinishPartTemplate("",
            this.PLAY_HOLDER_NUMBER, this.PLAY_HOLDER_NUMBER, this.PLAY_HOLDER_NUMBER))
        this.api = api;
    }

    /**
     * 前端输入，映射到后端输出
     * @param raw_prompt
     */
    promptList = async (raw_prompt: string = ""): Promise<string[]> => {
        await this.getSubtitlesFromPageText();
        console.log(this.subtitles);
        // TODO: 没有字幕怎么办
        const subtitle = await this.getSubtitlesByUserSelection();
        console.log(subtitle);
        if (!subtitle) {
            return [];
        }
        this.prompts = this.subtitleSplitText(subtitle);
        return this.prompts;
    }

    /**
     * TODO: 后端响应，映射到前端渲染
     */
     response = async () => {
         // send to background
         // receive the [] of response text
         // send to frontend by add timestamp? TODO: later
         //

     }
    // TODO：改成英文，更节省tokens
    // TODO: links
    static promptTemplate = (start: number, end: number): string => {
         return `这部分总结请用[${start}-${end}]开头。`
    }
    
    static FirstPartPromptPrefix = (count): string => {
        return `总结以下这段视频的部分字幕，请注意一共有${count}段。`;
    }

    static promptFirstPartTemplate = (first_part: string, lang, start: number, end: number): string => {
        return `请用${lang}表达。字幕的第一部分是${first_part}。${this.promptTemplate(start, end)}`;
    }

    static promptMiddlePartTemplate = (other_part: string, lang, start: number, end: number, index): string => {
        return `请用${lang}总结以下这段视频的部分字幕，字幕第${index}部分是${other_part}。${this.promptTemplate(start, end)}`;
    }

    static promptFinishPartTemplate = (lang, start: number, end: number, count): string => {
        return `请用${lang}总结你上述${count}部分回答。${this.promptTemplate(start, end)};`
    }

    _getMaxLimit = () => {
        return Math.max(this.firstPartLimit, this.secondPartLimit);
    }

    /*
    未登录：
        [
        {
            "name": "中文（中国）",
            "url": "https://i0.hdslb.com/bfs/subtitle/5649d5ccda0ca7e3bfa0eb6ade00c14fe5c30dfa.json"
        },
        {
            "name": "英语（美国）",
            "url": "https://i0.hdslb.com/bfs/subtitle/24bb2f4ab9b835fe48456a75ed8a34b060e92232.json"
        }
    ]
    登陆后：
    [
        {
            "name": "中文（中国）",
            "url": "https://i0.hdslb.com/bfs/subtitle/5649d5ccda0ca7e3bfa0eb6ade00c14fe5c30dfa.json"
        },
        {
            "name": "英语（美国）",
            "url": "https://i0.hdslb.com/bfs/subtitle/24bb2f4ab9b835fe48456a75ed8a34b060e92232.json"
        },
        {
            "name": "中文（自动翻译）",
            "url": "https://i0.hdslb.com/bfs/ai_subtitle/prod/9084937171053511090cfa05b496a1c9c31d71c2809d5a14736"
        }
    ]
     */
    getSubtitlesFromPageText = async () : Promise<{name: string, url: string}[]> => {
        try {
            const currentPageText = this.page_text;

            // regex to match the subtitle_url
            const regex = /lan_doc":"(.*?)".*?subtitle_url":"(.*?)"/g; // added 'g' flag for global search

            // Find all matches for subtitle_url
            const matches = [...currentPageText.matchAll(regex)];

            // Extract the URLs from the matches and decode them
            const subtitleUrls = matches.map(
                (match) => {
                    const decoded = decodeURIComponent(match[2]);
                    // replace http to https
                    const url = decoded
                        .replace("http", "https")
                        .replaceAll("\\u002F", "/")
                    return {
                        name: match[1],
                        url: url,
                    };
                });
            this.subtitles = subtitleUrls;
            return subtitleUrls;
        } catch (error) {
            console.error("An error occurred while processing subtitles:", error);
        }
    };

    getSubtitlesByUserSelection = async () : Promise<Subtitle> => {
        if (this.subtitles.length === 0) {
            return ;
        }
        let selectedSubtitle = this.subtitles.find((subtitle) => subtitle.name === this._currentSelect);
        if (selectedSubtitle) {

        } else {
            selectedSubtitle = this.subtitles[0];
        }
        const response = await fetch(selectedSubtitle.url);
        return await response.json();
    }

    /**
     *
     * @param subtitle
     */
    subtitleSplitText = (subtitle: Subtitle) : string[] => {
        const body = subtitle.body;
        // use addStringAvoidOverLimit
        const result = [];
        let tmp_string = "";
        let begin_time_index = 0;
        let limit = this.firstPartLimit;
        for (let i = 0; i < body.length; i++) {
            let [is_added , may_added_tmp_string] = addStringAvoidOverLimit(tmp_string, body[i].content, limit);
            if (is_added) {
                tmp_string = may_added_tmp_string;
            } else {
                if (tmp_string.length > 0) {  // normals case
                    result.push(
                        BilibiliAdapter.promptFirstPartTemplate(tmp_string, this._lang, body[begin_time_index].from, body[i].to)
                    );
                } else {
                    // edge case: asset the context string length is less than limit, if not? split it
                    //    no test for it now
                    //   ignore from time issue
                    while (isOverLimit(body[i].content, limit)) {
                        const split_string = text2tokenAndSplit(body[i].content, limit);
                        result.concat(split_string.map(str => {
                            if (result.length > 0) {
                                return BilibiliAdapter.promptMiddlePartTemplate(str, this._lang, body[begin_time_index].from, body[i].to, result.length + 1)
                            } else {
                                return BilibiliAdapter.promptFirstPartTemplate(str, this._lang, body[begin_time_index].from, body[i].to)
                            }
                        }));
                    }
                }
                if (result.length > 0 && limit !== this.secondPartLimit) {
                    limit = this.secondPartLimit;
                }
                begin_time_index = i + 1;

                tmp_string = "";
            }
        }
        if (tmp_string.length > 0) {
            // Maybe the last part is not added
            if (result.length === 0) {
                result.push(
                    BilibiliAdapter.promptFirstPartTemplate(tmp_string, this._lang, body[0].from,
                        body[body.length - 1].to)
                )
            } else {
                result.push(
                    BilibiliAdapter.promptMiddlePartTemplate(tmp_string, this._lang, body[body.length - 1].from,
                        body[body.length - 1].to, result.length)
                );
            }
        }
        if (result.length > 0) {
            result[0] = `${BilibiliAdapter.FirstPartPromptPrefix(result.length)}\n${result[0]}`
        }
        if (result.length > 2) {
        // add last part if prompt split length > 2
            result.push(
                BilibiliAdapter.promptFinishPartTemplate(this._lang, body[0].from, body[body.length - 1].to, result.length)
            );
        }
        return result;
    }
}
