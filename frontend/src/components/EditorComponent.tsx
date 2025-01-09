"use client";
import React, { useState } from "react";
import Tiptap from "./Tiptap";

const EditorComponent = () => {
  const [content, setContent] = useState<string>("");
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      content: content,
    };
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid place-items-center mx-auto p-10 mb-10"
    >
      <p className=" text-5xl text-center mb-10">Write Your News</p>

      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
};

export default EditorComponent;
