import React, { useEffect, useState } from "react";
import NewsContainer from "./NewsContainer";
import Swal from "sweetalert2";

interface UserId {
  userId: string;
}

interface News {
  id: string;
  title: string;
  content: string;
  posterImage?: string;
  flare: string;
  is_Author_Anonymous: boolean;
  postingTime: string;
  upvotes: number;
  downvotes: number;
  bookmarkCount: number;
}

const ProfileNewsFetcher = ({ userId }: UserId) => {
  const [flare, setFlare] = useState<string>("featured");
  const [loading, setLoading] = useState<boolean>(false);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/news/posts/userNews/${userId}/${flare}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch news");
        const data: News[] = await res.json();
        setNews(data || []);
      } catch (error: any) {
        Swal.fire({
          title: "Something went wrong!",
          text: error.message,
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (flare) fetchNews();
  }, [flare]);

  console.log(news.length);

  if (loading) return <p>News Loading........</p>;
  return (
    <div className=" flex flex-col gap-2">
      <div className="button-group flex items-center justify-around gap-14 m-3">
        <button
          className={`${
            flare === "featured"
              ? "bg-black text-white "
              : "border-2 border-black "
          }hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 `}
          onClick={() => setFlare("featured")}
        >
          Featured
        </button>
        <button
          className={`${
            flare === "allNews"
              ? "bg-black text-white "
              : "border-2 border-black "
          }hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 `}
          onClick={() => setFlare("allNews")}
        >
          All News
        </button>
        <button
          className={`${
            flare === "bookmarked"
              ? "bg-black text-white "
              : "border-2 border-black "
          }hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 `}
          onClick={() => setFlare("bookmarked")}
        >
          Bookmarked
        </button>
        <button
          className={`${
            flare === "upvoted"
              ? "bg-black text-white "
              : "border-2 border-black "
          }hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 `}
          onClick={() => setFlare("upvoted")}
        >
          Upvoted
        </button>
        <button
          className={`${
            flare === "collaboration"
              ? "bg-black text-white "
              : "border-2 border-black "
          }hover:bg-slate-700 hover:text-white font-medium rounded-full text-md px-4 py-2 text-center me-2 mb-2 `}
          onClick={() => setFlare("collaboration")}
        >
          Collaborations
        </button>
      </div>
      {news.length === 0 && (
        <p className=" text-2xl text-center p-5">
          Sorry! No news to show here :)
        </p>
      )}
      <div className="grid grid-cols-3 my-4 gap-x-5 gap-y-8">
        {news.length > 0 &&
          news?.map((n) => (
            <NewsContainer
              id={n.id}
              title={n.title}
              content={n.content}
              posterImage={n.posterImage}
              flare={n.flare}
              is_Author_Anonymous={n.is_Author_Anonymous}
              postingTime={n.postingTime}
              upvotes={n.upvotes}
              downvotes={n.downvotes}
              bookmarkCount={n.bookmarkCount}
            />
          ))}
      </div>
    </div>
  );
};

export default ProfileNewsFetcher;
