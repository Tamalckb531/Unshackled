"use client";
import DashBoardComponent from "@/components/DashBoardComponent";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  return (
    <div className=" bg-[#F0F7FF] min-h-[100vh] text-black">
      <DashBoardComponent />
    </div>
  );
};

export default page;
