"use client";
import React, { useState } from "react";
import Tiptap from "./Tiptap";
import FlareDropdown from "./FlareDropdown";

const EditorComponent = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [posterImage, setPosterImage] = useState<string>("");
  const [flare, setFlare] = useState<string>("");
  const [isAuthorAnonymous, setIsAuthorAnonymous] = useState<boolean>(false);
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      title: title,
      content: content,
      posterImage: posterImage,
      flare: flare,
      isAuthorAnonymous: isAuthorAnonymous,
    };
    console.log(data);
  };
  const changeFlare = (newFlare: string) => {
    setFlare(newFlare);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-5 items-center mx-auto p-10 mb-10"
    >
      <p className=" text-5xl text-center mb-10">Write Your News</p>

      <input
        className=" w-full p-4 mt-5 mb-12 outline-none text-5xl"
        placeholder="Write your title here....."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className=" w-full flex items-start justify-around">
        <div className="upload_file -mt-8">
          <label className="block mb-2 text-xl font-medium text-gray-900 ">
            Upload Poster Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none outline-none"
          />
          <p className="mt-1 text-sm text-gray-500" id="file_input_help">
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>

        <FlareDropdown changeFlare={changeFlare} />

        <label className="inline-flex items-center me-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            onClick={() => setIsAuthorAnonymous(!isAuthorAnonymous)}
          />
          <div className="relative w-[4.3rem] h-9 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-8 after:w-8 after:transition-all peer-checked:bg-teal-600"></div>
          <span className="ms-3 text-lg font-medium text-gray-900">
            Anonymous
          </span>
        </label>
      </div>

      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
};

export default EditorComponent;
