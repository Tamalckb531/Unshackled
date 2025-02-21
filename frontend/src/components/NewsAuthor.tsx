import { userState } from "@/store/atom";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineFeaturedPlayList } from "react-icons/md";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";

interface Author {
  id: string;
  newsId: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: string;
  bio: string;
  email: string;
  is_Author_Anonymous: boolean;
  collaborators: {
    id: string;
    firstName: string;
    lastName: string;
    photoURL?: string;
  }[];
}

const NewsAuthor = ({
  id,
  newsId,
  firstName,
  lastName,
  userName,
  photoUrl,
  bio,
  email,
  is_Author_Anonymous,
  collaborators,
}: Author) => {
  const user = useRecoilState(userState)[0];
  const router = useRouter();

  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  useEffect(() => {
    if (!user || id !== user?.id) return;

    const alreadyFeatured = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/news/posts/isFeatured/${newsId}`, //?isFeatured
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.msg || "Failed to check feature state");
        }

        const result = await res.json();
        setIsFeatured(result);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error occured in feature state check operation",
          text: error.message,
        });
      }
    };

    alreadyFeatured();
  }, []);

  const handleFeature = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/news/posts/feature/${newsId}`, //?isFeatured
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.msg || "Failed to toggle feature");
      }
      setIsFeatured((prev) => !prev);

      if (!isFeatured) {
        Swal.fire({
          icon: "success",
          title: "News featured successfully",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "News removed from being featured",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error occured in feature operation",
        text: error.message,
      });
    }
  };

  const validateDelete = () => {
    Swal.fire({
      title: "Do you want to delete this post?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/news/posts/delete/${newsId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.msg || "Failed to toggle feature");
      }
      Swal.fire({
        icon: "success",
        title: "News deleted successfully!",
      });

      router.push("/dashboard");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error occured in delete operation",
        text: error.message,
      });
    }
  };

  return (
    <div className=" mt-2">
      <div className="min-w-[17vw] border border-slate-500 p-5 rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-5">Author </h1>
        {is_Author_Anonymous ? (
          "Sorry! As our policy for journalist safety, we can't show any details of an anonymous author"
        ) : (
          <div>
            <div className=" flex flex-col items-center justify-center my-4 gap-1">
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={photoUrl}
                alt={userName}
                onClick={() => router.push(`/profile/${id}`)}
              />
              <h2 className=" text-nowrap text-xl">
                {firstName} {lastName}
              </h2>
              <h3
                className=" text-sm font-thin cursor-pointer"
                onClick={() => router.push(`/profile/${id}`)}
              >
                @{userName}
              </h3>
              <h3 className=" text-sm mt-2">{email}</h3>
            </div>
            <p className=" font-light text-sm ">{bio}</p>
          </div>
        )}
      </div>

      {!is_Author_Anonymous && collaborators.length > 0 && (
        <div className="min-w-[17vw] border border-slate-500 px-3 py-5 rounded-2xl mt-5">
          <h1 className="text-2xl font-bold text-center mb-5">
            Collaborators{" "}
          </h1>
          <div className=" flex flex-col items-start justify-center gap-5 mx-3">
            {collaborators.map((clb) => {
              return (
                <div
                  key={clb.id}
                  className=" flex items-center justify-around gap-3 overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/profile/${clb.id}`)}
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={clb.photoURL}
                    alt={clb.firstName}
                  />
                  <h2 className=" text-nowrap text-xl">
                    {clb.firstName} {clb.lastName}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {id === user?.id && (
        <div className=" flex flex-col gap-2 mt-20 ml-7 text-lg cursor-pointer">
          <h1 className="text-lg font-bold mb-6">Action </h1>
          <button
            className=" flex items-center gap-2 text-emerald-700"
            onClick={handleFeature}
          >
            <MdOutlineFeaturedPlayList size={25} />{" "}
            {!isFeatured ? "Feature this news" : "Remove from being featured"}
          </button>
          <button className=" flex items-center gap-2 text-blue-700">
            <CiEdit size={25} /> Edit this post
          </button>
          <button
            className=" flex items-center gap-2 text-red-500"
            onClick={validateDelete}
          >
            <MdDeleteOutline size={25} /> Delete this post
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsAuthor;
