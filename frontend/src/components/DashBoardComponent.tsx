import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileDataBox from "./ProfileDataBox";
import ProfileNewsFetcher from "./ProfileNewsFetcher";

const DashBoardComponent = () => {
  return (
    <div>
      <ProfileInfo />
      <ProfileDataBox />
      <ProfileNewsFetcher />
    </div>
  );
};

export default DashBoardComponent;
