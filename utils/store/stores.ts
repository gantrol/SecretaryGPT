import {Settings} from "~utils/constants";
import {browserSyncStorage} from "~utils/store/browser";


export const isAlwaysOpenedSetting =  browserSyncStorage(Settings.alwaysOpen, false);
export const isDebugModeSetting = browserSyncStorage(Settings.debug, false);

