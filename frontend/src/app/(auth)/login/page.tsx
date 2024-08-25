"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginBodyTypes, LoginSchema } from "@tamaldip/common";
import FormField from "@/components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atom";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginBodyTypes>({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();

  const setUser = useSetRecoilState(userState);

  const onSubmit = async (values: LoginBodyTypes) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      setUser(data.user);

      router.push("/dashboard");
    } catch (error: any) {
      alert("Login failed! Please try again.");
    }
  };

  return (
    <div className="grid md:grid-cols-2 h-screen w-full bg-[#F0F7FF] text-black">
      {/* Left side: image */}
      <div className="hidden md:block bg-gradient-to-r from-[#4c4cff] to-[#ff4c4c] rounded-l-xl overflow-hidden">
        <img
          src="/image/signin.webp"
          alt="Sign-up image"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Right side form  */}
      <div className="flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="max-w-md w-full space-y-6">
          {/* Text and credentials */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff9b9b] to-[#9b9bff]">
              Sign In
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Actual form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              {/* <input
                id="email"
                placeholder=""
                type="email"
              /> */}
              <FormField
                type="email"
                placeholder="m@example.com"
                name="email"
                register={register}
                error={errors.email}
              />
            </div>
            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <span className="text-sm font-medium underline underline-offset-4 hover:text-primary">
                  Forgot password?
                </span>
              </div>
              <FormField
                type="password"
                placeholder=""
                name="password"
                register={register}
                error={errors.password}
              />
            </div>
            {/* Sign-in */}
            <div className="space-y-2">
              <button
                className="bg-[#EFC3E8] w-full p-2 rounded-xl"
                type="submit"
              >
                Sign-In
              </button>
            </div>
            {/* login with google */}
            <div className="space-y-2">
              <button
                className="border-4 border-[#EFC3E8] w-full p-2 rounded-xl hover:bg-[#EFC3E8]"
                type="submit"
              >
                Login With Google
              </button>
            </div>
            {/* Don't have any account  */}
            <div className=" text-center">
              Don't have an account ?
              <span
                className=" font-bold text-[#ee88dd] cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                {" "}
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
