import React, { useState } from "react";

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
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen z-50 bg-transparent backdrop-blur-lg flex items-center justify-center"
      onClick={() => setShowEdit(false)}
    >
      <form
        className=" flex flex-col gap-3 items-center justify-center bg-white text-lg p-5 rounded-lg w-[650px] border shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="w-32 h-32 object-cover rounded-full border-slate-500 border-4 border-opacity-50"
          src={photoUrl}
          alt={`Profile Image of`}
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
