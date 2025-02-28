import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import Swal from "sweetalert2";

interface notificationProps {
  setShowNotification: (value: boolean) => void;
}

interface Notification {
  id: string;
  sender: string;
  senderImg: string;
  isChecked: boolean;
  newsId: string;
  topic: string;
  createdAt: Date;
  receiverId: string;
}

const NotificationBar: React.FC<notificationProps> = ({
  setShowNotification,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUnChecked = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/notification/bulk`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.msg || "Failed to send notification");
        }
        const result: Notification[] = await res.json();
        setNotifications(result);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Couldn't get the notifications",
          text: error.message,
        });
      }
    };

    getUnChecked();
  }, []);
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
        {loading && (
          <p className=" text-center text-2xl text-slate-400">
            Loading Notifications...
          </p>
        )}
        <div className="flex flex-col max-h-[50vh] overflow-y-auto justify-start mt-5 pb-4 border-b scrollbar-none">
          {notifications.length > 0
            ? notifications.map((not) => <NotificationCard key={not.id} />)
            : !loading && (
                <p className=" text-center text-2xl text-slate-400">
                  No notifications to show
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
