import React from "react";
import { ListOrdered } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const OrderedListBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleOrderedList().run();
      }}
      className={
        editor.isActive("orderedList")
          ? "is-active bg-sky-700 text-white p-2 rounded-lg"
          : " text-black bg-slate-200 p-2 rounded-lg"
      }
    >
      <ListOrdered className=" w-4 h-4" />
    </button>
  );
};

export default OrderedListBtn;
