import React from "react";
import { Bold } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}
const BoldButton = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleBold().run();
      }}
      className={
        editor.isActive("bold")
          ? " bg-sky-700 text-white p-2 rounded-lg"
          : " text-black bg-slate-200 p-2 rounded-lg"
      }
    >
      <Bold className=" w-4 h-4" />
    </button>
  );
};

export default BoldButton;
