"use client";
import { userState } from "@/store/atom";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useRecoilValue(userState);
  if (!user) router.push("/login");
  return <>{children}</>;
}
