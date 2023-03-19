import {writable} from "svelte/store";
import type {API} from "~utils/api";
import type {ChatViewModel} from "~utils/viewmodel";

export const backendList = writable<API[]>([]);
export const chatViewModel = writable<ChatViewModel>(null);
