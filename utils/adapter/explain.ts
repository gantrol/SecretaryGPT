import {MultipartTextAdapter} from "~utils/adapter/multipartTextAdapter";

export class ExplainAdapter extends MultipartTextAdapter {

    promptList(raw_prompt: string): string[] {
        return this.splitText(raw_prompt)
    }

    FirstPartPromptPrefix(count): string {
        return `请根据下面的片段，推断写作者是什么角色。并模仿一类或多类角色做出解释, note that there are ${count} part.`;
    }

    /**
     *
     * @param part
     * @param index start from 1
     */
    promptTemplate(part: string, index): string {
        return `Here is the part ${index} to explain by ${this.lang}, 注意需要模仿一类或多类角色:\n${part}`;
    }
}
