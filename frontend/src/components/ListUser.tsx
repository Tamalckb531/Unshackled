import { userState } from "@/store/atom";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";

interface Users {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoURL: string;
}

const ListUser = ({ id, firstName, lastName, userName, photoURL }: Users) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const router = useRouter();
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user.id === id || !user) return;
    const alreadyFollowing = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/profile/isfollowing/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.msg || "Failed to fetch user profile");
        }
        const result = await res.json();
        setIsFollowing(result);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Couldn't get the user from list user",
          text: error.message,
        });
      }
    };
    alreadyFollowing();
  }, []);

  const handleFollow = async () => {
    try {
      if (!user) router.push("login");
      const res = await fetch(
        `http://localhost:3000/api/profile/follow/${id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to fetch user profile");
      }
      setIsFollowing((prev) => !prev);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Couldn't get the user from",
        text: error.message,
      });
    }
  };
  return (
    <div className=" flex items-center justify-between">
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
            onClick={handleFollow}
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
            onClick={handleFollow}
          >
            {hover ? "Unfollow" : "Following"}
          </button>
        ))}
    </div>
  );
};

export default ListUser;
