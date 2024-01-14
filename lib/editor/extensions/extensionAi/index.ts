import ExtensionAi from './extension-ai'
import { TextOptionsType, ToneEnum } from './types';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        extensionAi: {
            /**
             * Set a code mark
             */
            aiAdjustTone: (tone?: ToneEnum, options?: TextOptionsType) => ReturnType;
        };
    }
}

export default ExtensionAi