import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { followState, userState } from "@/store/atom";
import Swal from "sweetalert2";
import DashBoardComponent from "./DashBoardComponent";

const ProfileWrapper = () => {
  const router = useRouter();
  const { userId } = useParams();
  const setFollower = useSetRecoilState(followState);

  const user = useRecoilValue(userState);
  const [userProfile, setUserProfile] = useState();

  if (user.id === userId) router.push("/dashboard");
  if (!userId) return <p>Loading......</p>;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/profile/${userId}`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.msg || "Failed to fetch user profile");
        }
        const user = await res.json();
        setUserProfile(user);
        setFollower(user.followerCount);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Couldn't get the user",
          text: error.message,
        });
      }
    };
    if (userId) fetchUser();
  }, [userId, user]);

  return <div>{userProfile && <DashBoardComponent user={userProfile} />}</div>;
};

export default ProfileWrapper;
