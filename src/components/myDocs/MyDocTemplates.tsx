"use client";
import { SAVE_DOC_TEMPLATE } from "@/constants/envConfig";
import axiosInstance from "@/utils/axiosInstance";
import { useCustomSession } from "@/utils/session";
import {
  Calendar,
  ClipboardCheck,
  Edit,
  Eye,
  File,
  Plus,
  Search,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const MyDocTemplates = () => {
  const session = useCustomSession();
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axiosInstance.get(SAVE_DOC_TEMPLATE);

        const filteredData = response.data.filter((item: any) =>
          item?.users_json?.includes(session?.user?.email)
        );
        setTemplates(response.data);
      } catch (err) {
        console.log("error----", err);
      }
    };
    fetchTemplates();
  }, [session]);

  console.log("templates----", templates);
  return (
    <div className="flex flex-col max-w-[800px] mx-auto justify-center gap-4 w-full items-center">
      <div className="flex w-full mt-4 gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates"
            className="pl-10 text-md"
          />
        </div>
        <Link href="/myDocs/new">
          <Button size={"icon"}>
            <Plus className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="w-full space-y-4">
        {templates
          .filter((item: any) =>
            item.template_name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item: any) => (
            <Card key={item.mydoc_id} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl">
                      {item.template_name}
                    </h2>
                    {/* <Bot className="h-5 w-5 text-muted-foreground" /> */}
                  </div>

                  {/* <div className="flex items-center gap-2 text-muted-foreground">
              <Code className="h-5 w-5" />
              <span>Doc ID: {item.mydoc_id}</span>
            </div> */}

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span>
                      Created:{" "}
                      {new Date(item.created_date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant={
                        item.status === "active"
                          ? "default"
                          : item.status === "inactive"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Version: {item.version_no}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Created by: {item.created_user_name}
                    </span>
                    <div className="flex items-center gap-3">
                      <Link href={`/myDocs/new/${item.mydoc_id}`}>
                        <Plus className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                      </Link>
                      <Link href={`/myDocs/edit/${item.mydoc_id}`}>
                        <Edit className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                      </Link>
                      <a
                        href={item.doc_publish_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default MyDocTemplates;
