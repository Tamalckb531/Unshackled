import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecoilRoot } from "recoil";
import RecoilContextProvider from "../../store/RecoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unshackled",
  description: "A open world news media where anyone can show there journalism",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilContextProvider>
          <div className="flex flex-col min-h-[100dvh] bg-gradient-to-r from-[#1f2937] via-[#374151] to-[#1f2937]">
            <Header />
            {children}
            <Footer />
          </div>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
