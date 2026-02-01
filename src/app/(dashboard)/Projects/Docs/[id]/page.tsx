import React from "react";
import dynamic from "next/dynamic";
import NewProjectDocs from "@/components/Projects/Docs/NewDocs";


const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-[800px]  w-full p-4 mx-auto">
      <NewProjectDocs id={params.id} />
    </div>
  );
};

export default page;
