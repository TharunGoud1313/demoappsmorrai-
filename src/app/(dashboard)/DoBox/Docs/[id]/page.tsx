import React from "react";
import dynamic from "next/dynamic";
import DoBoxDocs from "@/components/DoBox/Docs/Docs";


const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-[800px]  w-full p-4 mx-auto">
      <DoBoxDocs id={params.id} />
    </div>
  );
};

export default page;
