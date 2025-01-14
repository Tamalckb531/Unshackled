"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
const Tiptap = ({ content, onChange }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    editable: true,
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Subscript,
      Superscript,
      Placeholder.configure({
        placeholder: "Write Your news here.......",
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // Parse URL with default protocol if needed
            const parsedUrl = new URL(
              url.includes(":") ? url : `${ctx.defaultProtocol}://${url}`
            );
            const protocol = parsedUrl.protocol.replace(":", "");

            // Allow only http/https
            return ctx.protocols.includes(protocol);
          } catch {
            return false;
          }
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col flex-grow px-4 py-3 justify-start text-black items-start h-full w-full gap-3 text-[18px] pt-4 outline-none text-start leading-6",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar at the top */}
      <div className="flex-none">
        <Toolbar editor={editor} content={content} />
      </div>

      {/* Scrollable EditorContent */}
      <div className="overflow-y-auto h-[45vh] px-4 editor-styles">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
