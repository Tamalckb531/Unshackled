import React from "react";
import ListUser from "./ListUser";

interface followList {
  setShowList: (value: boolean) => void;
  title: string;
}

const FollowList = ({ setShowList, title }: followList) => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen z-50 bg-transparent backdrop-blur-lg flex items-center justify-center"
      onClick={() => setShowList(false)}
    >
      <div
        className=" bg-white text-xl font-bold p-5 rounded-lg w-[550px] border shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className=" text-center text-2xl mb-5">{title}</p>
        <div className=" flex flex-col gap-3 p-2">
          <ListUser />
          <ListUser />
          <ListUser />
          <ListUser />
          <ListUser />
          <ListUser />
        </div>
      </div>
    </div>
  );
};

export default FollowList;
