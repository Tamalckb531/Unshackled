import formatDate from "@/helper/DMYFormatter";
import { Calendar, Mail, MapPin } from "lucide-react";
import React, { useState } from "react";
import ProfileEditor from "./ProfileEditor";
import { useRouter } from "next/navigation";

interface profileInfo {
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
  const [isFollowing, setIsFollowing] = useState<boolean>(true);
  const [hover, setHover] = useState(false);
  const router = useRouter();

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
