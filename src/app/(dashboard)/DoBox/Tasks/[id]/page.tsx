import React from "react";
import dynamic from "next/dynamic";
import DoBoxTasks from "@/components/DoBox/Tasks/Tasks";


const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-[800px]  w-full p-4 mx-auto">
      <DoBoxTasks id={params.id} />
    </div>
  );
};

export default page;
