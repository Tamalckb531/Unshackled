"use client";
import React, { useState } from "react";
import Tiptap from "./Tiptap";
import { v4 as uuid4 } from "uuid";

const NotePicker = () => {
  const [content, setContent] = useState<string>("");
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      id: uuid4(),
      content: content,
    };
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" max-w-3xl w-full grid place-items-center  mx-auto pt-10 mb-10"
    >
      <div className=" text-3xl text-center mb-10">Write Your News</div>
      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
};

export default NotePicker;
