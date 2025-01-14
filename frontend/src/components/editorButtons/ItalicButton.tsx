import React from "react";
import { Italic } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const ItalicButton = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleItalic().run();
      }}
      className={
        editor.isActive("italic")
          ? " bg-sky-700 text-white p-2 rounded-lg"
          : " text-black bg-slate-200 p-2 rounded-lg"
      }
    >
      <Italic className=" w-4 h-4" />
    </button>
  );
};

export default ItalicButton;
