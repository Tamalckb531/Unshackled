import React from "react";
import { Highlighter } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const HighlightBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleHighlight().run();
      }}
      className={
        editor.isActive("highlight")
          ? "is-active bg-sky-700 text-white p-2 rounded-lg"
          : " text-black bg-slate-200 p-2 rounded-lg"
      }
    >
      <Highlighter className=" w-4 h-4" />
    </button>
  );
};

export default HighlightBtn;
