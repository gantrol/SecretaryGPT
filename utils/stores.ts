import { writable } from 'svelte/store';
import {chatTypes} from "~utils/constants";

export const chatType = writable(chatTypes.ChatGPT);
