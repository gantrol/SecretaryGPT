import { writable } from 'svelte/store';
import {chatTypes} from "~utils/constants";

export const chatTypeChatGPT = writable(chatTypes.ChatGPT);

export const chatTypeBing = writable(chatTypes.Bing);
