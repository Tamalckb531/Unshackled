"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { notificationState, userState, WebSocketState } from "@/store/atom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { MdNotifications } from "react-icons/md";
import NotificationBar from "./NotificationBar";

//? check

interface InvitationData {
  type: "invitation";
  hostId: string;
  firstName: string;
  lastName: string;
  from: string;
  photoURL: string;
  room: string;
}

interface StatusData {
  type: "invitation";
  status: string;
  collaboratorId: string;
  from: string;
  firstName: string;
  lastName: string;
  photoURL: string;
}

const Header = () => {
  const [showDropdown, setShowDropDown] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const user = useRecoilState(userState)[0];
  const resetUser = useResetRecoilState(userState);
  const router = useRouter();
  const ws = useRef<WebSocket | null>(null);
  const setWebSocket = useSetRecoilState(WebSocketState);
  const [notificationCount, setNotificationCount] =
    useRecoilState(notificationState);

  useEffect(() => {
    if (user && !ws.current) {
      const token = Cookies.get("access_token");
      if (!token) return;

      ws.current = new WebSocket(`ws://localhost:3000?token=${token}`);

      setWebSocket(ws.current);

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type == "invitation") {
            handleInvitation(data);
          } else if (data.type == "collaborator_response") {
            handleStatus(data);
          } else if (data.type == "host_disconnect_msg") {
            handleDisconnectMsg();
          } else if (data.type === "host_submitted_news") {
            handleSubmitMsg(data);
          } else if (data.type === "receive_notification") {
            setNotificationCount((prev) => prev + 1);
          }
        } catch (error: any) {
          Swal.fire({
            position: "bottom-end",
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      };
    } else if (!user) {
      ws.current?.close();
      ws.current = null;
      setWebSocket(null);
    }

    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
        setWebSocket(null);
      }
    };
  }, [user]);

  const handleStatus = (data: StatusData) => {
    Swal.fire({
      position: "bottom-end",
      icon: `${data.status === "accepted" ? "success" : "error"}`,
      title: `${data.firstName} ${data.lastName} has ${data.status} the invitation`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDisconnectMsg = () => {
    Swal.fire({
      title: "Host Disconnected",
      text: "Go to dashboard",
      icon: "question",
    });
    router.push("/dashboard");
  };

  const handleSubmitMsg = (data: any) => {
    Swal.fire({
      title: "Host Submitted news",
      text: `Go to the news section (NewsId : ${data.newsId})`,
      icon: "success",
    });
    router.push(`/newsfeed/${data.newsId}`);
  };

  const handleInvitation = (data: InvitationData) => {
    Swal.fire({
      title: "Collaboration Invitation",
      text: `${data.firstName} ${data.lastName} has invited you to join a collaboration room.`,
      imageUrl: data.photoURL,
      imageWidth: 80,
      imageHeight: 80,
      imageAlt: "User Profile Picture",
      showCancelButton: true,
      confirmButtonText: "Join Room",
      cancelButtonText: "Decline",
    }).then((result: any) => {
      const response = {
        type: "invitation_response",
        status: result.isConfirmed ? "accepted" : "rejected",
        host: data.hostId,
      };
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(response));
      }
      if (result.isConfirmed) {
        router.push(`/editor?room=${data.room}`);
      }
    });
  };

  const singOutFunc = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Sign out is not working. Please try again");
      }

      resetUser();

      if (ws.current) {
        ws.current.close();
        setWebSocket(null);
        ws.current = null;
      }

      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "You are signed out",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/");
    } catch (error: any) {
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        singOutFunc();
      }
    });
  };

  return (
    <>
      {showNotification && (
        <NotificationBar setShowNotification={setShowNotification} />
      )}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <h1
          className="flex items-center justify-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#9333ea] to-[#f472b6]">
            Unshackled
          </span>
          <div className="ml-auto flex items-center gap-4"></div>
        </h1>
        <nav className="ml-auto mr-3 flex items-center justify-center gap-4 sm:gap-6">
          {user && (
            <div
              className="flex-shrink-0 mt-2 mx-1 relative"
              onClick={() => setShowNotification((prev) => !prev)}
            >
              {notificationCount > 0 && (
                <button className="absolute -top-1 -right-1 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  <span
                    className={`${
                      notificationCount < 99 ? " text-xs" : "text-[0.6rem]"
                    }`}
                  >
                    {notificationCount < 99 ? notificationCount : "99+"}
                  </span>
                </button>
              )}
              <MdNotifications size={30} />
            </div>
          )}
          {user ? (
            <div>
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user.photoURL}
                alt={`profile image of ${user.userName}`}
                onClick={() => {
                  setShowDropDown(!showDropdown);
                }}
              ></img>
              {showDropdown ? (
                <div className="z-1 fixed top-14 right-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <div className="mt-4 mb-3 ml-4 text-sm text-gray-900 dark:text-white">
                    <div className=" mb-1">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="font-medium truncate">{user.email}</div>
                  </div>
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="avatarButton"
                  >
                    <li>
                      <a
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                        onClick={() => router.push("/dashboard")}
                      >
                        Dashboard
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <button
              onClick={() => {
                router.push("/login");
              }}
            >
              {" "}
              Sign in
            </button>
          )}

          {/* </div> */}
        </nav>
      </header>
    </>
  );
};

export default Header;
