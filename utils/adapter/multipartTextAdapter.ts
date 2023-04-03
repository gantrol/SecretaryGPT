import {
    addStringAvoidOverLimit,
    addStringAvoidOverLimitWithToken,
    isOverLimit,
    MAX_TOKENS,
    text2tokenAndSplit
} from "~utils/prompt/tokenize";
import {chatTypes, languageI18n} from "~utils/constants";

export abstract class MultipartTextAdapter {
    protected firstPartLimit;
    protected secondPartLimit;
    private api;
    // TODO: this should be define by api
    MAX_TOKENS = 4096;
    protected lang;

    constructor(api = chatTypes.ChatGPT, lang = languageI18n.NONE) {
        this.api = api;
        this.lang = lang;
    }

    abstract promptList(raw_prompt: string, max_tokens): string[];

    abstract FirstPartPromptPrefix(count): string;

    abstract promptTemplate(part: string, index): string

    splitText = (text: string, max_tokens = 4096): string[] => {
        this.MAX_TOKENS = max_tokens
        this.calLimit()
        const result: string[] = [];
        let currentParagraph = '';

        // Split by natural paragraphs
        const paragraphs = text.split('\n');
        let currentTokens;
        for (const paragraph of paragraphs) {
            // If a natural paragraph is too long, split it irregularly
            if (isOverLimit(paragraph, this.firstPartLimit)) {
                if (currentParagraph !== '') {
                    result.push(currentParagraph);
                    currentParagraph = '';
                }
                const splitParagraphs = this.splitLongParagraph(paragraph);
                result.push(...splitParagraphs);
            } else {
                const [merged, updatedText, updatedTokens] = addStringAvoidOverLimitWithToken(currentParagraph, paragraph, this.firstPartLimit, currentTokens);
                if (merged) {
                    currentParagraph = updatedText;
                    currentTokens = updatedTokens
                } else {
                    result.push(currentParagraph);
                    currentParagraph = paragraph;
                    currentTokens = 0;
                }
            }
        }

        if (currentParagraph !== '') {
            result.push(currentParagraph);
        }

        return result.map((text, index) => {
            const prompt_text = this.promptTemplate(text, index + 1);
            if (index === 0) {
                return `${this.FirstPartPromptPrefix(result.length)}${prompt_text}`;
            }
            return prompt_text;
        });
    }


    splitLongParagraph = (paragraph: string): string[] => {
        return text2tokenAndSplit(paragraph, this.firstPartLimit);
    }

    calLimit = () => {
        this.secondPartLimit = this.MAX_TOKENS - this.promptTemplate("", Number.MAX_SAFE_INTEGER).length
        this.firstPartLimit = this.secondPartLimit - this.FirstPartPromptPrefix(Number.MAX_SAFE_INTEGER).length
    }

}
