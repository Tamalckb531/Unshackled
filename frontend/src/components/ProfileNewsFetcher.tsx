import React from "react";
import NewsContainer from "./NewsContainer";

const ProfileNewsFetcher = () => {
  return (
    <div className=" flex flex-col gap-2">
      <div className="button-group flex items-center justify-around gap-14 m-3">
        <button
          autoFocus
          className="border-2 border-black hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 focus:bg-black focus:text-white "
        >
          Featured
        </button>
        <button className="border-2 border-black hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 focus:bg-black focus:text-white">
          All News
        </button>
        <button className="border-2 border-black hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 focus:bg-black focus:text-white">
          Collaborations
        </button>
        <button className="border-2 border-black hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 focus:bg-black focus:text-white">
          Upvoted
        </button>
        <button className="border-2 border-black hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 focus:bg-black focus:text-white">
          Bookmarked
        </button>
      </div>
      <div className="grid grid-cols-3 mt-4 gap-x-5 gap-y-8">
        <NewsContainer />
        <NewsContainer />
        <NewsContainer />
        <NewsContainer />
        <NewsContainer />
        <NewsContainer />
        <NewsContainer />
      </div>
    </div>
  );
};

export default ProfileNewsFetcher;
