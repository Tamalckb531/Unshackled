import React, { useCallback } from "react";
import { ImagePlus } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const ImageBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }
  return (
    <button
      type="button"
      onClick={addImage}
      className={" text-black bg-slate-200 p-2 rounded-lg"}
    >
      <ImagePlus className=" w-4 h-4" />
    </button>
  );
};

export default ImageBtn;
