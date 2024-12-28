import React from "react";

const NewsContent = ({ content }: { content: string }) => {
  return (
    <div className=" text-xl leading-8 tracking-wider font-serif text-justify">
      {content}
    </div>
  );
};

export default NewsContent;
