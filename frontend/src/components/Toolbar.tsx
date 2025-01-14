import React from "react";
import { type Editor } from "@tiptap/react";
import BoldButton from "./editorButtons/BoldButton";
import ItalicButton from "./editorButtons/ItalicButton";
import BulletList from "./editorButtons/BulletList";
import OrderedListBtn from "./editorButtons/OrderedListBtn";
import BlockQuoteBtn from "./editorButtons/BlockQuoteBtn";
import CodeBlocksBtn from "./editorButtons/CodeBlocksBtn";
import HeadingBtn from "./editorButtons/HeadingBtn";
import HorizontalRuleBtn from "./editorButtons/HorizontalRuleBtn";
import StrikeBtn from "./editorButtons/StrikeBtn";

interface editorProps {
  editor: Editor | null;
  content: string;
}

export const Toolbar = ({ editor, content }: editorProps) => {
  if (!editor) return null;
  return (
    <div className=" px-4 py-4 rounded flex justify-between items-start gap-5 w-full flex-wrap">
      <div className=" flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap list-decimal ">
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <BulletList editor={editor} />
        <OrderedListBtn editor={editor} />
        <BlockQuoteBtn editor={editor} />
        <CodeBlocksBtn editor={editor} />
        <HeadingBtn editor={editor} />
        <HorizontalRuleBtn editor={editor} />
        <StrikeBtn editor={editor} />
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
