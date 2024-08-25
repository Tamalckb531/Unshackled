"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { SignUpBodyTypes, SignUpSchema } from "@tamaldip/common";
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
  } = useForm<SignUpBodyTypes>({
    resolver: zodResolver(SignUpSchema),
  });
  const router = useRouter();

  const setUser = useSetRecoilState(userState);

  const onSubmit = async (values: SignUpBodyTypes) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
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
      alert("Signup failed! Please try again.");
    }
  };
  return (
    <div className="grid md:grid-cols-2 h-screen w-full bg-[#F0F7FF] text-black">
      {/* Right side: form */}
      <div className="flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="max-w-md w-full space-y-6">
          {/* Text and credentials */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff9b9b] to-[#9b9bff]">
              Sign Up
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to create your account.
            </p>
          </div>

          {/* Actual form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* First Name and Last Name */}
            <div className="flex space-x-4">
              {/* First Name */}
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  First Name
                </label>
                <FormField
                  type="text"
                  placeholder="John"
                  name="firstName"
                  register={register}
                  error={errors.firstName}
                />
              </div>
              {/* Last Name */}
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Last Name
                </label>
                <FormField
                  type="text"
                  placeholder="Doe"
                  name="lastName"
                  register={register}
                  error={errors.lastName}
                />
              </div>
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
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
                <a
                  href="#"
                  className="text-sm font-medium underline underline-offset-4 hover:text-primary"
                >
                  Forgot password?
                </a>
              </div>
              <FormField
                type="password"
                placeholder=""
                name="password"
                register={register}
                error={errors.password}
              />
            </div>
            {/* Button */}
            <div className="space-y-2">
              <button className="bg-[#EFC3E8] w-full p-2 rounded-xl">
                Sign-Up
              </button>
            </div>
            {/* login with google */}
            <div className="space-y-2">
              <button className="border-4 border-[#EFC3E8] w-full p-2 rounded-xl hover:bg-[#EFC3E8]">
                Login With Google
              </button>
            </div>
            {/* Already have an account  */}
            <div className=" text-center">
              Already have an account ?
              <span
                className=" font-bold text-[#ee88dd] cursor-pointer"
                onClick={() => router.push("/login")}
              >
                {" "}
                Sign In
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Left side: image */}
      <div className="hidden md:block bg-gradient-to-r from-[#4c4cff] to-[#ff4c4c] rounded-l-xl overflow-hidden">
        <img
          src="/image/signup.webp"
          alt="Sign-up image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default page;
