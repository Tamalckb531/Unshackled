import { zodResolver } from "@hookform/resolvers/zod";
import { CommentBodyTypes, CommentSchema, NewsData } from "@tamaldip/common";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { useRecoilState } from "recoil";
import { userState } from "@/store/atom";
import Swal from "sweetalert2";

type SingleComment = NewsData["comments"][number];

interface editorContext {
  newsId: string;
  parentId?: string; //? This is the id of the root comment which can be used as the commentId for editing comment
  onCommentAdd: (comment: SingleComment) => void;
  isContent: boolean;
  content?: string;
  contentHandler?: (cnt: string) => void;
  editorHandler?: () => void;
}

const CommentEditor = ({
  newsId,
  parentId,
  onCommentAdd,
  isContent,
  content,
  contentHandler,
  editorHandler,
}: editorContext) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<CommentBodyTypes>({
    resolver: zodResolver(CommentSchema),
  });
  const user = useRecoilState(userState)[0];
  const [localContent, setLocalContent] = useState<string>(content || "");

  useEffect(() => {
    if (isContent) {
      setValue("content", localContent);
    }
  }, [isContent, localContent, setValue]);

  console.log("isContent: ", isContent, " content: ", content);

  const onSubmit = async (values: CommentBodyTypes) => {
    try {
      const url = `http://localhost:3000/api/comments/${
        isContent ? "edit/" + parentId : "post/" + newsId
      }`;
      const method = isContent ? "PUT" : "POST";
      if (!isContent && parentId) values.parentId = parentId;
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      });
      if (!res.ok) throw Error("Edit operation failed");
      const data = await res.json();
      if (isContent) {
        contentHandler && contentHandler(data.comment.content || "");
      } else {
        onCommentAdd(data.comment);
      }
      reset();
      editorHandler && editorHandler();
      // if (isContent) {
      //   const res = await fetch(
      //     `http://localhost:3000/api/comments/edit/${parentId}`,
      //     {
      //       method: "PUT",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify(values),
      //       credentials: "include",
      //     }
      //   );
      //   if (!res.ok) throw Error("Edit operation failed");
      //   const data = await res.json();
      //   contentHandler && contentHandler(data.comment.content || "");
      //   reset();
      //   editorHandler && editorHandler();
      // } else {
      //   if (parentId) values.parentId = parentId;
      //   const res = await fetch(
      //     `http://localhost:3000/api/comments/post/${newsId}`,
      //     {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify(values),
      //       credentials: "include",
      //     }
      //   );
      //   if (!res.ok) {
      //     throw new Error("Couldn't upload the comment");
      //   }
      //   const data = await res.json();
      //   onCommentAdd(data.comment);
      //   reset();
      //   editorHandler && editorHandler();
      // }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `<p>${error.message}</p>`,
      });
    }
  };

  return (
    <>
      <form className=" mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormField
            type=""
            as="textarea"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
            placeholder="Write your thoughts here..."
            name="content"
            register={register}
            error={errors.content}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
            isControlled={isContent}
          />
          {user && (
            <button
              className="bg-blue-600 rounded-lg mt-2 py-2 px-5 text-lg text-white"
              type="submit"
            >
              Send
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CommentEditor;
