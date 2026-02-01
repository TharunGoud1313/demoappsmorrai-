import React from "react";
import dynamic from "next/dynamic";
import Docs from "@/components/Docs/Docs";
import NewDocs from "@/components/Docs/NewDocs";
// import NewDocs from "@/components/Docs/NewDocs";


const Page = () => {
  return <NewDocs isEdit={false} isView={false} />;
};

export default Page;
