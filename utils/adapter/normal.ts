import {MultipartTextAdapter} from "~utils/adapter/multipartTextAdapter";

export class NormalAdapter extends MultipartTextAdapter {

    promptList(raw_prompt: string): string[] {
        return this.splitText(raw_prompt)
    }

    FirstPartPromptPrefix(count): string {
        return ``;
    }

    promptTemplate(part: string, index): string {
        return `${part}, rely by ${this.lang}`;
    }
}
