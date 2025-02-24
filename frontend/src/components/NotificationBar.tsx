import React from "react";
import NotificationCard from "./NotificationCard";

interface notificationProps {
  setShowNotification: (value: boolean) => void;
}

const NotificationBar: React.FC<notificationProps> = ({
  setShowNotification,
}) => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen z-50 bg-transparent backdrop-blur-lg flex items-center justify-center"
      onClick={() => setShowNotification(false)}
    >
      <div
        className=" bg-white text-xl font-bold p-5 rounded-lg w-[650px] border shadow-lg text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <p className=" text-center text-2xl">Notifications</p>
        <div className="flex flex-col max-h-[50vh] overflow-y-auto justify-start mt-5 pb-4 border-b scrollbar-none">
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
