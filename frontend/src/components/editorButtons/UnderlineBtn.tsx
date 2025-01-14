import React from "react";
import { Underline } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const UnderlineBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleUnderline().run();
      }}
      className={
        editor.isActive("underline")
          ? "is-active bg-sky-700 text-white p-2 rounded-lg"
          : " text-black bg-slate-200 p-2 rounded-lg"
      }
    >
      <Underline className=" w-4 h-4" />
    </button>
  );
};

export default UnderlineBtn;
