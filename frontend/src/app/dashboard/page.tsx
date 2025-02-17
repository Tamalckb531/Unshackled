"use client";
import DashBoardComponent from "@/components/DashBoardComponent";
import React from "react";
import { followState, userState } from "@/store/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const page = () => {
  const user = useRecoilValue(userState);
  const setFollower = useSetRecoilState(followState);
  setFollower(user.followerCount);
  return (
    <div className=" bg-[#F0F7FF] min-h-[100vh] text-black">
      <DashBoardComponent user={user} />
    </div>
  );
};

export default page;
