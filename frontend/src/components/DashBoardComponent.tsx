import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileDataBox from "./ProfileDataBox";
import ProfileNewsFetcher from "./ProfileNewsFetcher";
import {
  collaborationCount,
  followeeState,
  followState,
  newsCount,
  userState,
} from "@/store/atom";
import { useRecoilValue } from "recoil";

const DashBoardComponent = ({ user }: any) => {
  const owner = useRecoilValue(userState);
  const follower = useRecoilValue(followState);
  const followee = useRecoilValue(followeeState);
  const newsNum = useRecoilValue(newsCount);
  const collaborationNum = useRecoilValue(collaborationCount);
  return (
    <div className=" flex flex-col items-center">
      <ProfileInfo
        id={user.id}
        firstName={user.firstName}
        lastName={user.lastName}
        userName={user.userName}
        bio={user.bio}
        location={user.location}
        email={user.email}
        createdAt={user.createdAt}
        photoUrl={user.photoURL}
        isOwnerProfile={user.id === owner.id}
      />
      <ProfileDataBox
        id={user.id}
        followerCount={follower}
        followeeCount={followee}
        newsCount={newsNum}
        collaborationCount={collaborationNum}
      />
      <ProfileNewsFetcher
        userId={user.id}
        isOwnerProfile={user.id === owner.id}
      />
    </div>
  );
};

export default DashBoardComponent;
