"use client";
import React, { useMemo, useRef, useState } from "react";
import Tiptap from "./Tiptap";
import FlareDropdown from "./FlareDropdown";
import Swal from "sweetalert2";
import { NewsSchema, userForCollaboration } from "@tamaldip/common";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleX } from "lucide-react";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
import CollaboratorSearch from "./CollaboratorSearch";

const appId = "7j9y6m10";
const generateRoomId = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let roomId = "";
  for (let i = 0; i < 9; i++) {
    roomId += chars[Math.floor(Math.random() * chars.length)];
  }
  return roomId;
};

const ydoc = new Y.Doc();

const EditorComponent = () => {
  const searchParams = useSearchParams();
  const room = useMemo(
    () => searchParams.get("room") || generateRoomId(),
    [searchParams]
  );

  const provider = useMemo(
    () =>
      new TiptapCollabProvider({
        appId,
        name: room,
        document: ydoc,
      }),
    [room]
  );

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [posterImage, setPosterImage] = useState<string>("");
  const [flare, setFlare] = useState<string>("");
  const [isAuthorAnonymous, setIsAuthorAnonymous] = useState<boolean>(false);
  const [collaborators, setCollaborators] = useState<userForCollaboration[]>(
    []
  );
  const [showCollaborationSearch, setShowCollaborationSearch] =
    useState<boolean>(false);
  const filePicker = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const handleContentChange = (reason: any) => {
    setContent(reason);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title: title.trim(),
      content,
      posterImage: posterImage || undefined,
      flare: flare.trim(),
      is_Author_Anonymous: isAuthorAnonymous,
      collaborators,
    };

    // Validate inputs using the Zod schema
    const validationResult = NewsSchema.safeParse(data);

    if (!validationResult.success) {
      // Display validation errors
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: validationResult.error.errors
          .map((err) => `${err.path[0]}: ${err.message}`)
          .join("\n"),
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/news/editor/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies in the request
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create news.");
      }

      const response = await res.json();

      console.log(response);

      Swal.fire({
        icon: "success",
        title: "News Created!",
        text: `News ID: ${response.newsId}`,
      });

      // Go to news page
      router.push(`/newsfeed/${response.newsId}`);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message,
      });
    }
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

  const handleCollaboration = async (e: any) => {
    setShowCollaborationSearch(!showCollaborationSearch);
  };

  return (
    <>
      {showCollaborationSearch && (
        <CollaboratorSearch
          setShowCollaborationSearch={setShowCollaborationSearch}
          collaborators={collaborators}
          setCollaborators={setCollaborators}
          room={room}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col gap-3 items-center mx-auto p-10 mb-10 z-0"
      >
        {/*//? collaboration and cancel button  */}
        <div className="flex w-full items-center justify-end gap-5">
          <button
            type="button"
            className="text-sm p-3 mt-2 rounded bg-blue-500 text-white"
            onClick={handleCollaboration}
          >
            Collaboration
          </button>
          <button
            type="button"
            className="text-sm p-2 mt-2 rounded bg-red-500 text-white"
          >
            <CircleX size={30} />
          </button>
        </div>

        <p className=" text-3xl text-center mb-14 font-bold">
          Compose Your News With Our Advance Editor
        </p>

        {/* //? posterImage, flare and anonymous  */}
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

          <span className=" flex gap-2 justify-center items-center">
            <FlareDropdown changeFlare={changeFlare} />{" "}
            <p className=" text-lg ml-2">{flare}</p>
          </span>

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
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <Tiptap
          content={content}
          onChange={(newContent: string) => handleContentChange(newContent)}
          provider={provider}
          ydoc={ydoc}
          room={room}
        />
      </form>
    </>
  );
};

export default EditorComponent;
