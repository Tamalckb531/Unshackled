import React from "react";
import { SquareChevronDown } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const SubscriptBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleSubscript().run();
      }}
      className={
        editor.isActive("subscript")
          ? "is-active bg-sky-700 text-white p-2 rounded-lg"
          : " text-black bg-slate-200 p-2 rounded-lg"
      }
    >
      <SquareChevronDown className=" w-4 h-4" />
    </button>
  );
};

export default SubscriptBtn;
