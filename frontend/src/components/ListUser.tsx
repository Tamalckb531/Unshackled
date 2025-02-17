import { userState } from "@/store/atom";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

interface Users {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoURL: string;
}

const ListUser = ({ id, firstName, lastName, userName, photoURL }: Users) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const router = useRouter();
  const user = useRecoilValue(userState);
  return (
    <div className=" flex items-center justify-between" key={1}>
      <span className="flex gap-5 items-center">
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src={photoURL || "https://randomuser.me/api/portraits/women/26.jpg"}
          alt="Rounded avatar"
          onClick={() => router.push(`/profile/${id}`)}
        />
        <span className="flex items-center gap-2">
          <h1
            className=" font-normal text-xl cursor-pointer"
            onClick={() => router.push(`/profile/${id}`)}
          >
            {firstName} {lastName}
          </h1>
          <p
            className=" font-light text-gray-400 text-xs cursor-pointer"
            onClick={() => router.push(`/profile/${id}`)}
          >
            @{userName}
          </p>
        </span>
      </span>
      {user.id !== id &&
        (!isFollowing ? (
          <button
            type="button"
            className="text-white bg-black font-medium rounded-full text-sm px-3 py-1.5 text-center me-1 mb-1 "
          >
            Follow
          </button>
        ) : (
          <button
            type="button"
            className={`border-2 font-medium rounded-full text-sm px-3 py-1.5 text-center me-1 mb-1 transition-all duration-300 ${
              hover ? "border-red-500 text-red-500" : "border-black text-black"
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover ? "Unfollow" : "Following"}
          </button>
        ))}
    </div>
  );
};

export default ListUser;
