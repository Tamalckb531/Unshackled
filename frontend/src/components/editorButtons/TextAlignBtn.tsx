import React from "react";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const TextAlignBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("left").run();
        }}
        className={
          editor.isActive({ textAlign: "left" })
            ? "is-active bg-sky-700 text-white p-2 rounded-lg"
            : " text-black bg-slate-200 p-2 rounded-lg"
        }
      >
        <AlignLeft className=" w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("center").run();
        }}
        className={
          editor.isActive({ textAlign: "center" })
            ? "is-active bg-sky-700 text-white p-2 rounded-lg"
            : " text-black bg-slate-200 p-2 rounded-lg"
        }
      >
        <AlignCenter className=" w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("right").run();
        }}
        className={
          editor.isActive({ textAlign: "right" })
            ? "is-active bg-sky-700 text-white p-2 rounded-lg"
            : " text-black bg-slate-200 p-2 rounded-lg"
        }
      >
        <AlignRight className=" w-4 h-4" />
      </button>
    </>
  );
};

export default TextAlignBtn;
