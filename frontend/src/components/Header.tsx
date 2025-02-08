"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { userState, WebSocketState } from "@/store/atom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

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
  const user = useRecoilState(userState)[0];
  const resetUser = useResetRecoilState(userState);
  const router = useRouter();
  const ws = useRef<WebSocket | null>(null);
  const setWebSocket = useSetRecoilState(WebSocketState);

  useEffect(() => {
    console.log("This run");
    console.log(user);
    console.log(ws.current);

    if (user && !ws.current) {
      const token = Cookies.get("access_token");
      if (!token) {
        console.log("Cookies not found");
        return;
      }

      console.log(token);

      ws.current = new WebSocket(`ws://localhost:3000?token=${token}`);
      setWebSocket(ws.current);

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type == "invitation") {
            handleInvitation(data);
          }
          if (data.type == "collaborator_response") {
            handleStatus(data);
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
    } else {
      ws.current?.close();
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
      <nav className="ml-auto mr-3 flex gap-4 sm:gap-6">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
          aria-label="Toggle theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        </button>
        {/* <div
          className="w-fit whitespace-nowrap rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 px-2 py-1 text-xs font-medium flex items-center gap-1"
          data-v0-t="badge"
        > */}
        {user ? (
          <div>
            <img
              className="w-10 h-10 rounded-full cursor-pointer"
              src="https://randomuser.me/api/portraits/women/26.jpg"
              alt="Rounded avatar"
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
  );
};

export default Header;
