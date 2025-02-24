import React from "react";

const NotificationCard = () => {
  return (
    <div className=" flex items-center justify-between py-4 px-2" key={1}>
      <span className="flex gap-5 items-center">
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src={"https://randomuser.me/api/portraits/women/26.jpg"}
          alt="Rounded avatar"
        />
        <span className="flex items-center gap-2">
          <p className=" font-normal text-xl">
            <span className=" font-bold">John Doe</span> has upvoted your news
          </p>
        </span>
      </span>
      <p className=" text-sm text-slate-400">2 days ago</p>
    </div>
  );
};

export default NotificationCard;
