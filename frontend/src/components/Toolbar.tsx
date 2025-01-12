import React from "react";
import { Bold, Italic, Strikethrough } from "lucide-react";

import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
  content: string;
}

export const Toolbar = ({ editor, content }: editorProps) => {
  if (!editor) return null;
  return (
    <div className=" px-4 py-4 rounded flex justify-between items-start gap-5 w-full flex-wrap">
      <div className=" flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        {/* bold button  */}
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
          <Bold className=" w-5 h-5" />
        </button>
        {/* Italic button  */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? " bg-sky-700 text-white p-2 rounded-lg"
              : " text-black"
          }
        >
          <Italic className=" w-5 h-5" />
        </button>
      </div>

      {content && (
        <button
          type="submit"
          className="py-1 px-2 text-lg bg-sky-700 text-white rounded-lg"
        >
          Add
        </button>
      )}
    </div>
  );
};
