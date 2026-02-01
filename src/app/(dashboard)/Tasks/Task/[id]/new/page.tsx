import NewTask from "@/components/Tasks/Task/NewTask";
import dynamic from "next/dynamic";


const Page = ({ params }: { params: { id: string } }) => {
  return <NewTask isEdit={false} isView={false} id={params.id} />;
};

export default Page;
