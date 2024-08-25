"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="max-w-3xl text-center space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#9333ea] to-[#f472b6]">
          Unshackled
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground">
          Revealing the truth with our independent journalist from all over the
          world.
        </p>
      </div>
      <section className="w-full max-w-5xl mt-12 md:mt-16 lg:mt-20 xl:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Tablet />
      </section>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 m-5"
        onClick={() => {
          router.push("/login");
        }}
      >
        What's today ?
      </button>
    </main>
  );
}

const Tablet: React.FC = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-[#e5e4e2] to-[#cfcfcf] rounded-lg shadow-md p-6 flex flex-col items-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 text-primary text-[#f581aa]"
        >
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
          <path d="M18 14h-8"></path>
          <path d="M15 18h-5"></path>
          <path d="M10 6h8v4h-8V6Z"></path>
        </svg>
        <h3 className="text-xl font-bold mt-4 text-[#2c2c2c]">Authenticity</h3>
        <p className="text-muted-foreground mt-2 text-[#2c2c2c]">
          Here anyone can create their journalist account and our fact check
          team approve them.
        </p>
      </div>
      <div className="bg-gradient-to-r from-[#e5e4e2] to-[#cfcfcf] rounded-lg shadow-md p-6 flex flex-col items-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 text-primary text-[#f581aa]"
        >
          <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
          <rect x="2" y="6" width="14" height="12" rx="2"></rect>
        </svg>
        <h3 className="text-xl font-bold mt-4 text-[#2c2c2c]">
          Video Highlights
        </h3>
        <p className="text-muted-foreground mt-2 text-[#2c2c2c]">
          Catch the most important news events in video format.
        </p>
      </div>
      <div className="bg-gradient-to-r from-[#e5e4e2] to-[#cfcfcf] rounded-lg shadow-md p-6 flex flex-col items-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 text-primary text-[#f581aa]"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
        </svg>
        <h3 className="text-xl font-bold mt-4 text-[#242323]">
          Personalized Feed
        </h3>
        <p className="text-muted-foreground mt-2 text-[#2c2c2c]">
          Customize your news feed to your interests and preferences.
        </p>
      </div>
    </>
  );
};
