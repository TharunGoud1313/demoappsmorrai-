import NewDoBox from "@/components/DoBox/NewDoBox";
import dynamic from "next/dynamic";



const Page = () => {
  return (
    <div>
      <NewDoBox isEdit={false} isView={false} />
    </div>
  );
};

export default Page;
