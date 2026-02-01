import ShareToUsers from "@/components/myDocs/ShareToUsers/ShareToUsers";
import dynamic from "next/dynamic";



const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-[800px] p-4 mx-auto">
      <ShareToUsers id={params.id} />
    </div>
  );
};

export default Page;
