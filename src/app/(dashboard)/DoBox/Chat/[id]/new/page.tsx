import NewDoBoxChat from "@/components/DoBox/Chat/NewChat";
import dynamic from "next/dynamic";


const Page = ({ params }: { params: { id: string } }) => {
  return <NewDoBoxChat isEdit={false} isView={false} id={params.id} />;
};

export default Page;
