"use client";
import DashBoardComponent from "@/components/DashBoardComponent";
import React, { useEffect } from "react";
import {
  collaborationCount,
  followeeState,
  followState,
  newsCount,
  userState,
} from "@/store/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Swal from "sweetalert2";

const page = () => {
  const user = useRecoilValue(userState);
  const setNewsCount = useSetRecoilState(newsCount);
  const setCollaborationCount = useSetRecoilState(collaborationCount);
  const setFollowee = useSetRecoilState(followeeState);
  const setFollower = useSetRecoilState(followState);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user/getCount", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.msg || "Couldn't get the user count");
        }

        const result = await res.json();
        setNewsCount(result.newsCount);
        setCollaborationCount(result.collaborationCount);
        setFollowee(result.followeeCount);
        setFollower(result.followerCount);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error in fetching user data",
          text: error.message,
        });
      }
    };

    if (user) fetchCount();
  }, [user]);

  return (
    <div className=" bg-[#F0F7FF] min-h-[100vh] text-black">
      <DashBoardComponent user={user} />
    </div>
  );
};

export default page;
