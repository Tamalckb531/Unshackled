"use client";
import DashBoardComponent from "@/components/DashBoardComponent";
import { userState } from "@/store/atom";

import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilValue } from "recoil";

const demo = {
  analytics: null,
  bio: "Quos vespillo tibi traho error solio cavus uxor.",
  createdAt: "2024-12-21T16:19:19.181Z",
  email: "ckbtamaldipnew@gmail.com",
  firstName: "Tamal",
  followeeCount: 0,
  followerCount: 0,
  id: "5573903a-98dc-421c-bf30-6a9265261bc5",
  isProfileComplete: false,
  lastName: "Chakraborty",
  location: "Chittagong",
  newsCount: 0,
  photoURL: "https://avatars.githubusercontent.com/u/99481723",
  updatedAt: "2025-01-01T13:52:51.040Z",
  userName: "cm4ydww7h0000a3dk7vp6alsw",
};

const page = () => {
  const user = useRecoilValue(userState);
  const router = useRouter();

  return (
    <div className=" bg-[#F0F7FF] min-h-[100vh] text-black border border-red-500">
      {/* <h1 className=" font-bold text-5xl">
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
      )} */}
      <DashBoardComponent />
    </div>
  );
};

export default page;
