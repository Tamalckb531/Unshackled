import React from "react";
import { Code } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const CodeBlocksBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleCodeBlock().run();
      }}
      className={
        editor.isActive("codeBlock")
          ? "is-active bg-sky-700 text-white p-2 rounded-lg"
          : " text-black bg-slate-200 p-2 rounded-lg"
      }
    >
      <Code className=" w-4 h-4" />
    </button>
  );
};

export default CodeBlocksBtn;
