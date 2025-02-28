import timeAgo from "@/helper/timeAgo";
import { useRouter } from "next/navigation";
import React from "react";

interface NotificationCardProps {
  sender: string;
  senderImg: string;
  isChecked: boolean;
  newsId: string;
  topic: string;
  createdAt: Date;
  setShowNotification: (value: boolean) => void;
}

const NotificationCard = ({
  sender,
  senderImg,
  isChecked,
  newsId,
  topic,
  createdAt,
  setShowNotification,
}: NotificationCardProps) => {
  let topicMsg = topic === "followed" ? "you" : "your news";
  const router = useRouter();
  const handleNotificationClick = () => {
    if (topic === "followed") {
      router.push("/dashboard");
    } else {
      router.push(`/newsfeed/${newsId}`);
    }
    setShowNotification(false);
  };
  return (
    <div
      className={`flex items-center justify-between py-4 px-2 cursor-pointer ${
        isChecked ? "" : " bg-slate-300"
      }`}
      onClick={handleNotificationClick}
    >
      <span className="flex gap-5 items-center">
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src={senderImg || "https://randomuser.me/api/portraits/women/26.jpg"}
          alt={sender}
        />
        <span className="flex items-center gap-2">
          <p className=" font-normal text-lg text-slate-500">
            <span className=" font-bold mr-2 text-xl text-black">{sender}</span>{" "}
            has {topic} {topicMsg}
          </p>
        </span>
      </span>
      <p className=" text-sm text-slate-500">{timeAgo(createdAt.toString())}</p>
    </div>
  );
};

export default NotificationCard;
