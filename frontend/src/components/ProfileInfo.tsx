import formatDate from "@/helper/DMYFormatter";
import { Calendar, Mail, MapPin } from "lucide-react";
import React from "react";

interface profileInfo {
  firstName: string;
  lastName: string;
  userName: string;
  bio: string;
  location: string;
  email: string;
  createdAt: string;
  photoUrl: string;
}

const ProfileInfo = ({
  firstName,
  lastName,
  userName,
  bio,
  location,
  email,
  createdAt,
  photoUrl,
}: profileInfo) => {
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-2 w-[60vw]">
      <img
        className="w-32 h-32 object-cover rounded-full border-slate-500 border-4 border-opacity-50"
        src={photoUrl}
        alt={`Profile Image of ${firstName} ${lastName}`}
      />
      <h1 className=" font-bold text-3xl -mb-2 ">
        {firstName} {lastName}
      </h1>
      <p className="text-slate-500 text-sm">@{userName}</p>
      <div className="button-group flex items-center justify-between gap-20 m-3 px-2">
        <button className="text-white bg-black font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 ">
          Edit Profile
        </button>
        {/* <button className="text-white bg-black font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 ">
          Follow
        </button> */}
        <button className="border-2 border-black hover:bg-black hover:text-white font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 ">
          Write News
        </button>
      </div>
      <p className="p-2 mb-5 text-lg text-slate-700 indent-8 leading-8 tracking-wide">
        {bio}
      </p>
      <div className="info-group flex items-center justify-around w-full text-sm text-slate-400">
        <p className=" flex items-center justify-center gap-1">
          <MapPin width={18} /> {location}
        </p>
        <p className=" flex items-center justify-center gap-1">
          <Mail width={18} /> {email}
        </p>
        <p className=" flex items-center justify-center gap-1">
          <Calendar width={18} /> joined {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
