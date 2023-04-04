import {MultipartTextAdapter} from "~utils/adapter/multipartTextAdapter";

export class SummaryAdapter extends MultipartTextAdapter {

    promptList(raw_prompt: string): string[] {
        return this.splitText(raw_prompt)
    }

    FirstPartPromptPrefix(count): string {
        return `Summary text below, note that there are ${count} part.`;
    }

    promptTemplate(part: string, index): string {
        return `用${this.lang}回答\nHere is the part ${index} to summary:\n${part}\n\n本段结束，请注意内容可能涉及多人、也可能只是单人。`;
    }
}
