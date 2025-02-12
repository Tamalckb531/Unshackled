import { Calendar, Mail, MapPin } from "lucide-react";
import React from "react";

const ProfileInfo = () => {
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-2 w-[60vw]">
      <img
        className="w-30 h-30 rounded-full border-slate-500 border-4 border-opacity-50"
        src="https://randomuser.me/api/portraits/men/28.jpg"
        alt="Rounded avatar"
      />
      <h1 className=" font-bold text-3xl -mb-2 ">John Doe</h1>
      <p className="text-slate-500 text-sm">@johndoex99</p>
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, rem
        odit laboriosam quia nisi dolore ipsam repudiandae aspernatur. Rerum
        doloremque quisquam accusamus soluta autem corporis.
      </p>
      <div className="info-group flex items-center justify-around w-full text-sm text-slate-400">
        <p className=" flex items-center justify-center gap-1">
          <MapPin width={18} /> New York, USA
        </p>
        <p className=" flex items-center justify-center gap-1">
          <Mail width={18} /> johnxyz@gmail.com
        </p>
        <p className=" flex items-center justify-center gap-1">
          <Calendar width={18} /> Joined March 2022
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
