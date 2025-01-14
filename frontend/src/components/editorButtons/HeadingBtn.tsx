import React from "react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const HeadingBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={
          editor.isActive("heading", { level: 1 })
            ? "is-active bg-sky-700 text-white p-[0.40rem] rounded-lg"
            : " text-black bg-slate-200 p-[0.40rem] rounded-lg"
        }
      >
        <p className=" text-sm"> H1 </p>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={
          editor.isActive("heading", { level: 2 })
            ? "is-active bg-sky-700 text-white p-[0.40rem] rounded-lg"
            : " text-black bg-slate-200 p-[0.40rem] rounded-lg"
        }
      >
        <p className=" text-sm"> H2 </p>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
        className={
          editor.isActive("heading", { level: 3 })
            ? "is-active bg-sky-700 text-white p-[0.40rem] rounded-lg"
            : " text-black bg-slate-200 p-[0.40rem] rounded-lg"
        }
      >
        <p className=" text-sm"> H3 </p>
      </button>
    </>
  );
};

export default HeadingBtn;
