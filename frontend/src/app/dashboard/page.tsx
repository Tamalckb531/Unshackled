"use client";
import DashBoardComponent from "@/components/DashBoardComponent";
import React from "react";
import { userState } from "@/store/atom";
import { useRecoilValue } from "recoil";

const page = () => {
  const user = useRecoilValue(userState);
  return (
    <div className=" bg-[#F0F7FF] min-h-[100vh] text-black">
      <DashBoardComponent user={user} />
    </div>
  );
};

export default page;
