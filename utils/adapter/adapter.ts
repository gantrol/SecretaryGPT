export interface Adapter {
    promptList(raw_prompt: string): Promise<string[]>;
}
