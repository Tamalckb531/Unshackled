import { userState } from "@/store/atom";
import { profileEditSchema, profileEditTypes } from "@tamaldip/common";
import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import Swal from "sweetalert2";

interface profileEditorProps {
  setShowEdit: (value: boolean) => void;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  photoUrl: string;
  bio: string;
  location: string;
}

const ProfileEditor: React.FC<profileEditorProps> = ({
  setShowEdit,
  firstName,
  lastName,
  userName,
  email,
  photoUrl,
  bio,
  location,
}) => {
  const [fname, setFname] = useState<string>(firstName);
  const [lname, setLname] = useState<string>(lastName);
  const [uname, setUname] = useState<string>(userName);
  const [mail, setMail] = useState<string>(email);
  const [photo, setPhoto] = useState<string>(photoUrl);
  const [userBio, setUserBio] = useState<string>(bio);
  const [address, setAddress] = useState<string>(location);
  const filePicker = useRef<HTMLInputElement | null>(null);
  const setUser = useSetRecoilState(userState);

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Upload_Image");
    data.append("cloud_name", "dbanpvlg0");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload image. Please try again.");
      }

      const uploadImageURL = await res.json();

      setPhoto(uploadImageURL.url);

      Swal.fire({
        title: "Image Uploaded!",
        icon: "success",
        draggable: true,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: error.message,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: profileEditTypes = {
      firstName: fname,
      lastName: lname,
      userName: uname,
      email: mail,
      photoUrl: photo,
      bio: userBio,
      location: address,
    };

    const validationResult = profileEditSchema.safeParse(data);

    if (!validationResult.success) {
      // Display validation errors
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: validationResult.error.errors
          .map((err) => `${err.path[0]}: ${err.message}`)
          .join("\n"),
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to update profile.");
      }

      const newUser: profileEditTypes = await res.json();

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: `Profile update of ${newUser.userName} is complete`,
      });

      setUser(newUser);
      setShowEdit(false);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message,
      });
    }
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen z-50 bg-transparent backdrop-blur-lg flex items-center justify-center"
      onClick={() => setShowEdit(false)}
    >
      <form
        className=" flex flex-col gap-3 items-center justify-center bg-white text-lg p-5 rounded-lg w-[650px] border shadow-lg"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
          ref={filePicker}
        />
        <img
          className="w-32 h-32 object-cover rounded-full border-slate-500 border-4 border-opacity-50"
          src={photo}
          alt={`Profile Image of ${fname} ${lname}`}
          onClick={() => filePicker.current?.click()}
        />
        <input
          className=" w-full p-4  outline-none border-b-2"
          placeholder="Write your first name here....."
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          className=" w-full p-4 outline-none border-b-2"
          placeholder="Write your last name here....."
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <input
          className=" w-full p-4  outline-none border-b-2"
          placeholder="Write your username here....."
          value={uname}
          onChange={(e) => setUname(e.target.value)}
        />
        <input
          type="email"
          className=" w-full p-4  outline-none border-b-2"
          placeholder="Write your email here....."
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          className=" w-full p-4  outline-none border-b-2"
          placeholder="Write your bio here....."
          value={userBio}
          onChange={(e) => setUserBio(e.target.value)}
        />
        <input
          className=" w-full p-4  outline-none border-b-2"
          placeholder="Write your location here....."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          type="submit"
          className=" p-2 bg-orange-500 text-white mt-5 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileEditor;
