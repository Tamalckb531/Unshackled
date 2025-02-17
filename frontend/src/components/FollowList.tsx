import React, { useEffect, useState } from "react";
import ListUser from "./ListUser";
import Swal from "sweetalert2";

interface followList {
  setShowList: (value: boolean) => void;
  title: string;
  userId: string;
}

interface Users {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoURL: string;
}

const FollowList = ({ setShowList, title, userId }: followList) => {
  const [user, setUser] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getFollow = async () => {
      try {
        const flag = title === "Followers" ? "getFollowers" : "getFollowings";
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/profile/${flag}/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.msg || "Failed to fetch users");
        }
        const result = await res.json();
        setLoading(false);
        if (title === "Followers") {
          setUser(result.map((item: any) => item.follower));
        } else {
          setUser(result.map((item: any) => item.followee));
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Couldn't get the user",
          text: error.message,
        });
      }
    };
    getFollow();
  }, []);
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen z-50 bg-transparent backdrop-blur-lg flex items-center justify-center"
      onClick={() => setShowList(false)}
    >
      <div
        className=" bg-white text-xl font-bold p-5 rounded-lg w-[650px] border shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className=" text-center text-2xl mb-5">{title}</p>
        <div className=" flex flex-col gap-3 p-2">
          {!loading && !(user.length > 0) && (
            <p className=" text-xl text-center text-slate-500">No {title} :)</p>
          )}
          {loading && (
            <p className=" text-xl text-center text-slate-500">
              Loading {title}......
            </p>
          )}
          {!loading &&
            user.length > 0 &&
            user.map((u) => (
              <ListUser
                key={u.id}
                id={u.id}
                firstName={u.firstName}
                lastName={u.lastName}
                userName={u.userName}
                photoURL={u.photoURL}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FollowList;
