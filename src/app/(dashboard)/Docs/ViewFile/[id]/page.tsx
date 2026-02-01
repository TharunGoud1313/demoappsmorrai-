import React from "react";
import dynamic from "next/dynamic";
import ViewFile from "@/components/Docs/ViewFile/ViewFile";


const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-[800px]  w-full p-4 mx-auto">
      <ViewFile id={params.id} />
    </div>
  );
};

export default page;
