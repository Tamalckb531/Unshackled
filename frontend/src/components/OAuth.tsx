import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase";
import { SignUpBodyTypes } from "@tamaldip/common";
import Swal from "sweetalert2";
import { userState } from "@/store/atom";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";

const OAuth = () => {
  const auth = getAuth(app);
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    //? this will always ask before login by google :
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const fName = resultsFromGoogle.user.displayName?.split(" ")[0];
      const lName = resultsFromGoogle.user.displayName?.split(" ").slice(-1)[0];

      type GoogleAuthType = Omit<SignUpBodyTypes, "password">;
      const values: GoogleAuthType = {
        email: resultsFromGoogle.user.email || "",
        firstName: fName || "",
        lastName: lName || "",
      };

      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      setUser(data.user);

      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "You are logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard");
    } catch (error: any) {
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Something went wrong. Please try again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <button
      className="flex gap-2 justify-center border-4 border-[#EFC3E8] w-full p-2 rounded-xl hover:bg-[#EFC3E8]"
      type="button"
      onClick={handleGoogleAuth}
    >
      <AiFillGoogleCircle className=" w-6 h-6" />
      Login With Google
    </button>
  );
};

export default OAuth;
