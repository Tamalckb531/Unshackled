import { userState } from "@/store/atom";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineFeaturedPlayList } from "react-icons/md";
import { useRecoilState } from "recoil";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: string;
  bio: string;
  email: string;
  is_Author_Anonymous: boolean;
}

const NewsAuthor = ({
  id,
  firstName,
  lastName,
  userName,
  photoUrl,
  bio,
  email,
  is_Author_Anonymous,
}: Author) => {
  const user = useRecoilState(userState)[0];
  console.log(user);

  return (
    <div className=" mt-2">
      {
        <div className="w-[14vw] border border-slate-500 p-5 rounded-2xl">
          <h1 className="text-lg font-bold text-center mb-5">Author </h1>
          {is_Author_Anonymous ? (
            "Sorry! As our policy for journalist safety, we can't show any details of an anonymous author"
          ) : (
            <div>
              <div className=" flex flex-col items-center justify-center my-4 gap-1">
                <img
                  className="w-10 h-10 rounded-full"
                  src={photoUrl}
                  alt={userName}
                />
                <h2 className=" text-nowrap text-lg">
                  {firstName} {lastName}
                </h2>
                <h3 className=" text-sm font-thin cursor-pointer">
                  @{userName}
                </h3>
                <h3 className=" text-sm mt-2">{email}</h3>
              </div>
              <p className=" font-light text-sm ">{bio}</p>
            </div>
          )}
        </div>
      }

      {id === user?.id && (
        <div className=" flex flex-col gap-2 mt-20 ml-7 text-lg cursor-pointer">
          <h1 className="text-lg font-bold mb-6">Action </h1>
          <p className=" flex items-center gap-2 text-emerald-700">
            <MdOutlineFeaturedPlayList size={25} /> Feature this post
          </p>
          <p className=" flex items-center gap-2 text-blue-700">
            <CiEdit size={25} /> Edit this post
          </p>
          <p className=" flex items-center gap-2 text-red-500">
            <MdDeleteOutline size={25} /> Delete this post
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsAuthor;
