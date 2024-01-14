import { Commands, Editor, Extension, RawCommands } from "@tiptap/core";
import { TextOptionsType, ToneEnum } from "./types";

type ExtensionAiOption = {
    openaiApiKey: string,
    api: string,
    onFinish: () => void,
    onError: () => void
}

const ExtensionAi: Extension<ExtensionAiOption, any> = Extension.create({
    name: "extension-ai",
    onSelectionUpdate() {
        // 获取选中的文本
        const selection = this.editor.state.selection;
        const from = selection.from;
        const to = selection.to;
        const selectedText = this.editor.state.doc.textBetween(from, to);
        console.log('selectedText', selectedText)
    },
    addOptions() {
        return {
            openaiApiKey: '',
            api: '',
            onFinish: () => { },
            onError: () => { }
        };
    },
    addCommands() {
        return {
            aiAdjustTone: (tone: ToneEnum = 'default', options: TextOptionsType) => ({ editor, commands }: { editor: Editor, commands: Editor['commands'] }) => {
                console.log(this.options, 'optins')
                // 在这里实现调整语气的逻辑
                const selection = editor.state.selection;
                const from = selection.from;
                const to = selection.to;
                const selectedText = editor.state.doc.textBetween(from, to);
                console.log('selectedText2', selectedText)
                // const adjustedContent = convertToTone(content, tone, options);
                const adjustedContent = selectedText
                // 示例：将调整后的文本设置回编辑器
                console.log(adjustedContent, 'adjustedContent')
                return commands.setContent(adjustedContent);
            },
        } as unknown as Partial<RawCommands>;
    },
});

export default ExtensionAi