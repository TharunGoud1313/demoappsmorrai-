import NewProjectChat from "@/components/Projects/Chat/NewChat";
import dynamic from "next/dynamic";


const Page = ({ params }: { params: { id: string } }) => {
  return <NewProjectChat isEdit={false} isView={false} id={params.id} />;
};

export default Page;
