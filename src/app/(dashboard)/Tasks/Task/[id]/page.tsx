import Task from "@/components/Tasks/Task/Task";
import dynamic from "next/dynamic";


const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-[800px]  w-full p-4 mx-auto">
      <Task id={params.id} />
    </div>
  );
};

export default page;
