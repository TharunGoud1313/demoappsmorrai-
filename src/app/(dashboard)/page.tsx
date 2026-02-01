import { auth } from "@/auth";
import UserInfo from "@/components/Capacitor/UserInfo";
import LogoutButton from "@/components/forms/logout-button";
import React from "react";
import dynamic from "next/dynamic";


const Home = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col bg-background/95 h-screen w-screen items-center justify-center">
      <div>
        <span className="text-primary">Hello {session?.user?.name}</span>
        <LogoutButton />
      </div>
      <div>
        <UserInfo />
      </div>
    </div>
  );
};

export default Home;
