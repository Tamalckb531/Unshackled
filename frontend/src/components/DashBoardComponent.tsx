import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileDataBox from "./ProfileDataBox";
import ProfileNewsFetcher from "./ProfileNewsFetcher";
import { followState, userState } from "@/store/atom";
import { useRecoilValue } from "recoil";

const DashBoardComponent = ({ user }: any) => {
  const owner = useRecoilValue(userState);
  const follower = useRecoilValue(followState);
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
        followeeCount={user.followeeCount}
        newsCount={user.newsCount}
        collaborationCount={user.collaborationCount}
      />
      <ProfileNewsFetcher
        userId={user.id}
        isOwnerProfile={user.id === owner.id}
      />
    </div>
  );
};

export default DashBoardComponent;
