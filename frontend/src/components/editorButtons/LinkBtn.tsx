import React, { useCallback } from "react";
import { Link2, Link2Off } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface editorProps {
  editor: Editor | null;
}

const LinkBtn = ({ editor }: editorProps) => {
  if (!editor) return null;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);

  return (
    <>
      <button
        type="button"
        onClick={setLink}
        className={
          editor.isActive("link")
            ? "is-active bg-sky-700 text-white p-2 rounded-lg"
            : " text-black bg-slate-200 p-2 rounded-lg"
        }
      >
        <Link2 className=" w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().unsetLink().run();
        }}
        className={"text-black bg-slate-200 p-2 rounded-lg"}
        disabled={!editor.isActive("link")}
      >
        <Link2Off className=" w-4 h-4" />
      </button>
    </>
  );
};

export default LinkBtn;
