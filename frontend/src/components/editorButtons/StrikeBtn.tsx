import React from "react";
import { Code, Strikethrough } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const StrikeBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleStrike().run();
      }}
      className={
        editor.isActive("strike")
          ? "is-active bg-sky-700 text-white p-2 rounded-lg"
          : " text-black bg-slate-200 p-2 rounded-lg"
      }
    >
      <Strikethrough className=" w-4 h-4" />
    </button>
  );
};

export default StrikeBtn;
