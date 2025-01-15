import React, { useCallback, useRef } from "react";
import { ImagePlus } from "lucide-react";
import { type Editor } from "@tiptap/react";
import Swal from "sweetalert2";

interface editorProps {
  editor: Editor | null;
}

const ImageBtn = ({ editor }: editorProps) => {
  if (!editor) return null;
  const filePicker = useRef<HTMLInputElement | null>(null);
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

      // Insert the uploaded image into the editor
      editor?.chain().focus().setImage({ src: uploadImageURL.url }).run();
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

  if (!editor) {
    return null;
  }
  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={filePicker}
        onChange={handleFileUpload}
      />
      <button
        type="button"
        onClick={() => filePicker.current?.click()}
        className={" text-black bg-slate-200 p-2 rounded-lg"}
      >
        <ImagePlus className=" w-4 h-4" />
      </button>
    </>
  );
};

export default ImageBtn;
