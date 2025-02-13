import React from "react";

interface databox {
  num: number;
  reason: string;
}

interface profileDataInfo {
  followerCount: number;
  followeeCount: number;
  newCount: number;
  collaborationCount: number;
}

const ProfileDataBox = () => {
  return (
    <>
      <div className=" w-[60vw] flex items-center justify-around mb-5">
        <Databox num={121} reason="Followers" />
        <Databox num={162} reason="Followings" />
        <Databox num={25} reason="News" />
        <Databox num={30} reason="Collaborations" />
      </div>
      <hr className="h-px w-[80vw] my-10 border-0 bg-gray-500" />
    </>
  );
};

export default ProfileDataBox;

const Databox = ({ num, reason }: databox) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 bg-black text-white rounded-md p-5 shadow-xl w-[150px]">
      <p className=" text-2xl">{num}</p>
      <p className=" font-bold">{reason}</p>
    </div>
  );
};
