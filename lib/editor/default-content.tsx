const DEFAULT_EDITOR_CONTENT = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "介绍 DING AI PRO" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "DING AI PRO由两个部分组成，文本编辑器和聊天窗口组成。文本编辑可快速触发一些内置ai事件，也可以直接使用ai。触发的ai事件会在聊天窗口发送至chantgpt接口，由chatgpt处理并在聊天接口返回。",
        },
        { type: "text", text: "." },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Features" }],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "斜杠菜单和气泡菜单" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "AI事件快速编辑" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "AI 自动补全，(输入 " },
                { type: "text", marks: [{ type: "code" }], text: "++" },
                {
                  type: "text",
                  text: "激活，或从斜杠菜单中选择）",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "图片上传（拖放/复制粘贴，或从斜杠菜单中选择）",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default DEFAULT_EDITOR_CONTENT;
