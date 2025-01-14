import React from "react";
import { SquareMinus } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const HorizontalRuleBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().setHorizontalRule().run();
      }}
      className={"text-black bg-slate-200 p-2 rounded-lg"}
    >
      <SquareMinus className=" w-4 h-4" />
    </button>
  );
};

export default HorizontalRuleBtn;
