import formatDate from "@/helper/DMYFormatter";
import { Calendar, Mail, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProfileEditor from "./ProfileEditor";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { followState, userState } from "@/store/atom";
import Swal from "sweetalert2";

interface profileInfo {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  bio: string;
  location: string;
  email: string;
  createdAt: string;
  photoUrl: string;
  isOwnerProfile: boolean;
}

const ProfileInfo = ({
  id,
  firstName,
  lastName,
  userName,
  bio,
  location,
  email,
  createdAt,
  photoUrl,
  isOwnerProfile,
}: profileInfo) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const user = useRecoilValue(userState);
  const setFollower = useSetRecoilState(followState);

  useEffect(() => {
    if (!user || isOwnerProfile) return;
    const alreadyFollowing = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/profile/isfollowing/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.msg || "Failed to fetch user profile");
        }
        const result = await res.json();
        setIsFollowing(result);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Couldn't get the user",
          text: error.message,
        });
      }
    };
    alreadyFollowing();
  }, []);

  const handleFollow = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/profile/follow/${id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to fetch user profile");
      }
      setIsFollowing((prev) => !prev);

      if (isFollowing) {
        setFollower((prev) => prev - 1);
      } else {
        setFollower((prev) => prev + 1);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Couldn't get the user",
        text: error.message,
      });
    }
  };

  return (
    <>
      {showEdit && (
        <ProfileEditor
          setShowEdit={setShowEdit}
          firstName={firstName}
          lastName={lastName}
          userName={userName}
          email={email}
          photoUrl={photoUrl}
          bio={bio}
          location={location}
        />
      )}
      <div className="flex flex-col justify-center items-center p-10 gap-2 w-[60vw]">
        <img
          className="w-32 h-32 object-cover rounded-full border-slate-500 border-4 border-opacity-50"
          src={photoUrl}
          alt={`Profile Image of ${firstName} ${lastName}`}
        />
        <h1 className=" font-bold text-3xl -mb-2 ">
          {firstName} {lastName}
        </h1>
        <p className="text-slate-500 text-sm">@{userName}</p>
        <div className="button-group flex items-center justify-between gap-20 m-3 px-2">
          {isOwnerProfile && (
            <button
              type="button"
              className="text-white bg-black font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 "
              onClick={() => setShowEdit((prev) => !prev)}
            >
              Edit Profile
            </button>
          )}
          {isOwnerProfile && (
            <button
              type="button"
              className="border-2 border-black hover:bg-black hover:text-white font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 "
              onClick={() => router.push("/editor")}
            >
              Write News
            </button>
          )}
          {!isOwnerProfile &&
            (!isFollowing ? (
              <button
                type="button"
                className="text-white bg-black font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 "
                onClick={handleFollow}
              >
                Follow
              </button>
            ) : (
              <button
                type="button"
                className={`border-2 font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 ${
                  hover
                    ? "border-red-500 text-red-500"
                    : "border-black text-black"
                }`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={handleFollow}
              >
                {hover ? "Unfollow" : "Following"}
              </button>
            ))}
          {!isOwnerProfile && (
            <button
              type="button"
              className="text-white bg-red-400 font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 "
            >
              Donate
            </button>
          )}
        </div>
        <p className="p-2 mb-5 text-lg text-slate-700 indent-8 leading-8 tracking-wide">
          {bio}
        </p>
        <div className="info-group flex items-center justify-around w-full text-sm text-slate-400">
          <p className=" flex items-center justify-center gap-1">
            <MapPin width={18} /> {location}
          </p>
          <p className=" flex items-center justify-center gap-1">
            <Mail width={18} /> {email}
          </p>
          <p className=" flex items-center justify-center gap-1">
            <Calendar width={18} /> joined {formatDate(createdAt)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
