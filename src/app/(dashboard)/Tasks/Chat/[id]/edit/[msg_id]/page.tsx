"use client";
import React, { useEffect, useState } from "react";
import { MESSAGES_API } from "@/constants/envConfig";
import { toast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import NewTaskChat from "@/components/Tasks/Chat/NewChat";


const EditTaskChatMsg = ({
  params,
}: {
  params: { id: string; msg_id: string };
}) => {
  const { id, msg_id } = params;
  const [msgData, setMsgData] = useState([]);

  useEffect(() => {
    const fetchMsgData = async () => {
      const response = await fetch(`${MESSAGES_API}?msg_id=eq.${msg_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      });
      if (!response.ok) {
        toast({
          description: "Failed to fetch contact data",
          variant: "destructive",
        });
      }
      const data = await response.json();
      setMsgData(data[0]);
    };
    fetchMsgData();
  }, [id, msg_id]);

  return (
    <div className="max-w-[800px]  w-full md:p-4 p-2 mx-auto">
      <NewTaskChat data={msgData} isEdit={true} isView={false} id={id} />
    </div>
  );
};

export default EditTaskChatMsg;
