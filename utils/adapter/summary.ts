import {MultipartTextAdapter} from "~utils/adapter/multipartTextAdapter";

export class SummaryAdapter extends MultipartTextAdapter {

    promptList(raw_prompt: string): string[] {
        return this.splitText(raw_prompt)
    }

    FirstPartPromptPrefix(count): string {
        return `Summary text below, note that there are ${count} part.`;
    }

    promptTemplate(part: string, index): string {
        return `Here is the part ${index} to summary:\n${part}\n注意内容可能涉及多人、也可能只是单人。\nAnswer by ${this.lang}`;
    }
}
