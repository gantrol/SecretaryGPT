import {MultipartTextAdapter} from "~utils/adapter/multipartTextAdapter";

/**
 * 润色
 */
export class RefineAdapter extends MultipartTextAdapter {

    promptList(raw_prompt: string, max_tokens = 2500): string[] {
        return this.splitText(raw_prompt, max_tokens)
    }

    FirstPartPromptPrefix(count): string {
        return `请你扮演一个编辑，审阅修改如下文本, note that there are ${count} part.`;
    }

    promptTemplate(part: string, index): string {
        return `Here is the part ${index} to review and proofread by ${this.lang}:\n${part}, 直接写出修改后的结果，不要做多余解释，不要只说出哪里要改。`;
    }
}
