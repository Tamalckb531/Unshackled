import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) return null;
  return (
    <div
      className=" px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className=" flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        {/* //? Bold Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? " bg-[#1f2937] text-white p-2 rounded-lg"
              : " text-[#1f2937]"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        {/* //? Italic Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-[#1f2937] text-white p-2 rounded-lg"
              : "text-[#1f2937]"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        {/* //? Strike Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-[#1f2937] text-white p-2 rounded-lg"
              : "text-[#1f2937]"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        {/* //? Heading Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-[#1f2937] text-white p-2 rounded-lg"
              : "text-[#1f2937]"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>
        {/* //? List Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-[#1f2937] text-white p-2 rounded-lg"
              : "text-[#1f2937]"
          }
        >
          <List className="w-5 h-5" />
        </button>
        {/* //? Order List Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-[#1f2937] text-white p-2 rounded-lg"
              : "text-[#1f2937]"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        {/* //? Quote Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-[#1f2937] text-white p-2 rounded-lg"
              : "text-[#1f2937]"
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        {/* //? Code Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-[#1f2937] text-white p-2 rounded-lg"
              : "text-[#1f2937]"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        {/* //? Undo Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-[#1f2937] text-white p-2 rounded-lg"
              : "text-[#1f2937] hover:bg-[#1f2937] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        {/* //? redo Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-[#1f2937] text-white p-2 rounded-lg"
              : "text-[#1f2937] hover:bg-[#1f2937] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
      {content && (
        <button
          type="submit"
          className=" px-4 py-2 bg-[#1f2937] text-white rounded-md text-xl"
        >
          Add
        </button>
      )}
    </div>
  );
};

export default Toolbar;
