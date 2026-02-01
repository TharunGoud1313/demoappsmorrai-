import ProjectChat from "@/components/Projects/Chat/Chat";
import dynamic from "next/dynamic";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-[800px]  w-full p-4 mx-auto">
      <ProjectChat id={params.id} />
    </div>
  );
};

export default page;
