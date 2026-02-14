"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NEXT_PUBLIC_API_KEY, SAVE_DOC_TEMPLATE } from "@/constants/envConfig";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { Session } from "../DocTemplate";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import {
  Search,
  Plus,
  File,
  ClipboardCheck,
  Edit,
  Eye,
  Calendar,
  Bot,
  Code,
} from "lucide-react";

function Loading() {
  return <div>Loading...</div>;
}

function ErrorDisplay({ error }: { error: Error }) {
  return <div>Error: {error.message}</div>;
}

function DocCardTemplates() {
  const [apiData, setApiData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [fromDate, setFromDate] = useState<any>(undefined);
  const [toDate, setToDate] = useState<any>(undefined);
  const [search, setSearch] = useState<string>("");
  const { data: sessionData } = useSession();
  const { toast } = useToast();
  const session: Session | null = sessionData
    ? (sessionData as unknown as Session)
    : null;

  const handleFromDateSelect = (date: Date | undefined) => {
    if (date) {
      setFromDate(date);
    }
  };

  const handleToDateSelect = (date: Date | undefined) => {
    if (date) {
      setToDate(date);
    }
  };

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(SAVE_DOC_TEMPLATE, {
          headers: {
            Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch API data");
        }
        const data = await response.json();
        const filteredData = data.filter(
          (item: any) => item.business_number === session?.user?.business_number
        );
        setApiData(filteredData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, [session]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  const filteredData = apiData.filter((item) => {
    const searchTerm = search.toLowerCase();
    return (
      item.template_name?.toLowerCase().includes(searchTerm) ||
      item.mydoc_id?.toString().includes(searchTerm) ||
      item.created_user_name?.toLowerCase().includes(searchTerm)
    );
  });

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
        <Link href="/doc_template">
          <Button size={"icon"}>
            <Plus className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="w-full space-y-4">
        {filteredData.map((item) => (
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
                    Created: {new Date(item.created_date).toLocaleDateString()}
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
                    {/* <Link href={`/doc_template`}> */}
                      <File className="h-5 w-5 text-muted-foreground stroke-[1.5] cursor-pointer hover:text-foreground" />
                    {/* </Link> */}
                    <ClipboardCheck className="h-5 w-5 text-muted-foreground stroke-[1.5] cursor-pointer hover:text-foreground" />
                    <Link href={`/doc-template/edit/${item.mydoc_id}`}>
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
}

export default function DocCardTemplate() {
  return <DocCardTemplates />;
}
