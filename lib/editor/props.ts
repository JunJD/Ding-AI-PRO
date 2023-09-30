import { EditorProps } from "@tiptap/pm/view";

export const TiptapEditorProps: EditorProps = {
  attributes: {
    class: `prose-lg prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full`,
  },
  handleDOMEvents: {
    keydown: (_view, event) => {
      // prevent default event listeners from firing when slash command is active
      if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
        const slashCommand = document.querySelector("#slash-command");
        if (slashCommand) {
          return true;
        }
      }
    },
  },
  handlePaste: (view, event) => {
    console.log(view, event)
    return false;
  },
  handleDrop: (view, event, _slice, moved) => {
    console.log(view, event, _slice, moved)
    return false;
  },
};
