"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapEditorProps } from "./props";
import { TiptapExtensions } from "./extensions";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
// import { toast } from "sonner";
import DEFAULT_EDITOR_CONTENT from "./default-content";
import { EditorBubbleMenu } from "./components/bubble-menu";
import { getPrevText } from "@/lib/editor/utils";
// import { ImageResizer } from "./components/image-resizer";
import useSaveStatus from "./hooks/useSaveStatus";
import { EditorState } from "@tiptap/pm/state";
import useTableOfContents from "./hooks/useTableOfContents";
import TableOfContent from "../tableOfContent";

export default function Editor() {
  const [content, setContent] = useLocalStorage(
    "content",
    DEFAULT_EDITOR_CONTENT,
  );
  const { setSaveStatus } = useSaveStatus();

  const [hydrated, setHydrated] = useState(false);
  
  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setSaveStatus("Saving...");
    setContent(json);
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 750);
  
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Unsaved");
      const editorState = e.editor.state;
      const doc = editorState.doc; // 当前的文档
      const selection = editorState.selection;

      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      });
      if (lastTwo === "++" && !isLoading) {

        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        complete(
          getPrevText(e.editor, {
            chars: 5000,
          }),
          {
            headers: {
              'openaikey': localStorage.getItem('OPENAI_API_KEY')!
            }
          }
        );
        // complete(e.editor.storage.markdown.getMarkdown());
        console.log('自动完成快捷方式已使用');
      } else {
        debouncedUpdates(e);
      }
    },
    autofocus: "end",
  });

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onFinish: (_prompt, completion) => {
      console.log('onfinsh')
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (err) => {
      // toast.error(err.message);
      if (err.message === "You have reached your request limit for the day.") {
      }
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop();
        if (e.key === "Escape") {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent("++");
      }
    };
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm("AI writing paused. Continue?")) {
        complete(editor?.getText() || "");
      }
    };
    if (isLoading) {
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    };
  }, [stop, isLoading, editor, complete, completion.length]);

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="flex w-full bg-white pt-3"
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      {editor && <TableOfContent editor={editor}/>}
      {/* {editor?.isActive("image") && <ImageResizer editor={editor} />} */}
      <EditorContent className="grow overflow-auto overscroll-none" style={{ height: 'calc(100vh - 65px)' }} editor={editor} />
    </div>
  );
}
