import React from "react";
import DOMPurify from "dompurify";

const NewsContent = ({ content }: { content: string }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div
      className="text-xl leading-8 tracking-wider font-serif text-justify editor-styles"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Use sanitized content
    />
  );
};

export default NewsContent;
