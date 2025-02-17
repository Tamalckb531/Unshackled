import React, { useEffect, useState } from "react";
import FollowList from "./FollowList";
import { useRecoilState } from "recoil";
import { followState } from "@/store/atom";

interface databox {
  num: number;
  reason: string;
  handleShowList: (reason: string) => void;
}

interface profileDataInfo {
  id: string;
  followerCount: number;
  followeeCount: number;
  newsCount: number;
  collaborationCount: number;
}

const ProfileDataBox = ({
  id,
  followeeCount,
  followerCount,
  newsCount,
  collaborationCount,
}: profileDataInfo) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const handleShowList = (reason: string) => {
    if (reason === "Followers" || reason === "Followings") {
      setShowList((prev) => !prev);
      setTitle(reason);
    }
  };
  return (
    <>
      {showList && (
        <FollowList setShowList={setShowList} title={title} userId={id} />
      )}
      <div className=" w-[60vw] flex items-center justify-around mb-5">
        <Databox
          num={followerCount}
          reason="Followers"
          handleShowList={handleShowList}
        />
        <Databox
          num={followeeCount}
          reason="Followings"
          handleShowList={handleShowList}
        />
        <Databox
          num={newsCount}
          reason="News"
          handleShowList={handleShowList}
        />
        <Databox
          num={collaborationCount}
          reason="Collaborations"
          handleShowList={handleShowList}
        />
      </div>
      <hr className="h-px w-[80vw] my-10 border-0 bg-gray-500" />
    </>
  );
};

export default ProfileDataBox;

const Databox = ({ num, reason, handleShowList }: databox) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 bg-black text-white rounded-md p-5 shadow-xl w-[150px] ${
        (reason === "Followers" || reason === "Followings") && " cursor-pointer"
      }`}
      onClick={() => handleShowList(reason)}
    >
      <p className=" text-2xl">{num}</p>
      <p className=" font-bold">{reason}</p>
    </div>
  );
};
