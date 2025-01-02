import { zodResolver } from "@hookform/resolvers/zod";
import { CommentBodyTypes, CommentSchema, NewsData } from "@tamaldip/common";
import React from "react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { useRecoilState } from "recoil";
import { userState } from "@/store/atom";

type SingleComment = NewsData["comments"][number];

interface editorId {
  newsId: string;
  parentId?: string;
  onCommentAdd: (comment: SingleComment) => void;
}

const CommentEditor = ({ newsId, parentId, onCommentAdd }: editorId) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CommentBodyTypes>({
    resolver: zodResolver(CommentSchema),
  });
  const user = useRecoilState(userState)[0];

  const onSubmit = async (values: CommentBodyTypes) => {
    try {
      if (parentId) values.parentId = parentId;
      const res = await fetch(
        `http://localhost:3000/api/news//posts/comments/${newsId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      onCommentAdd(data.comment);

      reset();
    } catch (error: any) {
      console.log("Issue occurred with the comment");
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
