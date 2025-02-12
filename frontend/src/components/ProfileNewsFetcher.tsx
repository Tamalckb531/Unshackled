import React from "react";

const ProfileNewsFetcher = () => {
  return (
    <div className="button-group flex items-center justify-around gap-14 m-3">
      <button className="border-2 border-black hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 focus:bg-black focus:text-white">
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
  );
};

export default ProfileNewsFetcher;
