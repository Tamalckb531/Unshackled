"use client";
import { userState } from "@/store/atom";

import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilValue } from "recoil";

const page = () => {
  const user = useRecoilValue(userState);
  const router = useRouter();

  return (
    <div className=" bg-[#F0F7FF] h-[88vh] text-black flex flex-col items-center justify-center">
      <h1 className=" font-bold text-5xl">
        {user ? `Hi ${user.firstName}!` : "no user"}
      </h1>
      {user && (
        <button
          className=" p-3 m-5 bg-orange-700 text-white rounded text-lg"
          onClick={() => {
            router.push("/editor");
          }}
        >
          Write a news
        </button>
      )}
    </div>
  );
};

export default page;
