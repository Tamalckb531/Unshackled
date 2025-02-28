import timeAgo from "@/helper/timeAgo";
import React from "react";

interface NotificationCardProps {
  sender: string;
  senderImg: string;
  isChecked: boolean;
  newsId: string;
  topic: string;
  createdAt: Date;
}

const NotificationCard = ({
  sender,
  senderImg,
  isChecked,
  newsId,
  topic,
  createdAt,
}: NotificationCardProps) => {
  return (
    <div className=" flex items-center justify-between py-4 px-1" key={1}>
      <span className="flex gap-5 items-center">
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src={senderImg || "https://randomuser.me/api/portraits/women/26.jpg"}
          alt={sender}
        />
        <span className="flex items-center gap-2">
          <p className=" font-normal text-lg text-slate-400">
            <span className=" font-bold mr-2 text-xl text-black">{sender}</span>{" "}
            has {topic} your news
          </p>
        </span>
      </span>
      <p className=" text-sm text-slate-400">{timeAgo(createdAt.toString())}</p>
    </div>
  );
};

export default NotificationCard;
