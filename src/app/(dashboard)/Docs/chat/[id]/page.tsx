import React from "react";
import dynamic from "next/dynamic";
import ChatwithDoc from "@/components/Docs/ChatwithDoc/Chat";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-[800px]  w-full p-4 mx-auto">
      <ChatwithDoc id={params.id} />
    </div>
  );
};

export default page;
