import NewTaskChat from "@/components/Tasks/Chat/NewChat";
import dynamic from "next/dynamic";


const Page = ({ params }: { params: { id: string } }) => {
  return <NewTaskChat isEdit={false} isView={false} id={params.id} />;
};

export default Page;
