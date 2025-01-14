"use client";
import React, { useRef, useState } from "react";
import Tiptap from "./Tiptap";
import FlareDropdown from "./FlareDropdown";
import Swal from "sweetalert2";

const EditorComponent = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [posterImage, setPosterImage] = useState<string>("");
  const [flare, setFlare] = useState<string>("");
  const [isAuthorAnonymous, setIsAuthorAnonymous] = useState<boolean>(false);
  const filePicker = useRef<HTMLInputElement | null>(null);

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

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Upload_Image");
    data.append("cloud_name", "dbanpvlg0");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload image. Please try again.");
      }

      const uploadImageURL = await res.json();

      setPosterImage(uploadImageURL.url);

      Swal.fire({
        title: "Image Uploaded!",
        icon: "success",
        draggable: true,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col gap-3 items-center mx-auto p-10 mb-10"
    >
      <p className=" text-3xl text-center mb-14 font-bold">
        Compose Your News With Our Advance Editor
      </p>

      <div className=" w-full flex items-start justify-between mt-5 px-6 ">
        <div className="upload_file flex">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            ref={filePicker}
          />
          <button
            type="button"
            className="text-sm p-2 mt-2 rounded bg-blue-500 text-white"
            onClick={() => filePicker.current?.click()}
          >
            Upload Poster Image
          </button>
        </div>

        <FlareDropdown changeFlare={changeFlare} />

        <label className="inline-flex items-center mt-4 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            onClick={() => setIsAuthorAnonymous(!isAuthorAnonymous)}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900">
            Anonymous
          </span>
        </label>
      </div>

      {posterImage && (
        <img
          src={posterImage}
          alt=""
          className="w-full mx-auto my-5 rounded-lg shadow-lg border border-gray-300 object-cover"
        />
      )}

      <input
        className=" w-full p-4 mt-8 outline-none text-3xl"
        placeholder="Write your title here....."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
};

export default EditorComponent;
