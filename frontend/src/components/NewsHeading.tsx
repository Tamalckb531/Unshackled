import React from "react";

const NewsHeading = () => {
  return (
    <div className=" flex flex-col gap-12 mb-12">
      {/* news image  */}
      <div className="flex items-center justify-center w-full h-[40vh] overflow-hidden rounded-lg">
        <img
          src="https://picsum.photos/seed/6MTFL/2496/3040"
          className="w-[70vw] h-full rounded-2xl object-cover"
          alt="news poster"
        />
      </div>

      {/* news heading content  */}
      <div className=" ml-6">
        <h1 className=" text-4xl mb-2 font-bold tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          omnis?
        </h1>
        <p className=" text-sm text-slate-400 tracking-wider">
          Written by{" "}
          <span className=" text-purple-400 italic font-semibold">userX</span>{" "}
          on{" "}
          <span className=" text-purple-400 italic font-semibold">flare</span>{" "}
          <span className=" ml-12 text-base italic">just now</span>
        </p>
      </div>
    </div>
  );
};

export default NewsHeading;
