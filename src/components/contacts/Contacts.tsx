"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Briefcase,
  Building2,
  Edit,
  Eye,
  Loader,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
} from "lucide-react";
import { GET_CONTACTS_API } from "@/constants/envConfig";
import { toast } from "../ui/use-toast";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Contacts = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      const response = await fetch(GET_CONTACTS_API, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      });
      const data = await response.json();
      setData(data);

      if (!response.ok) {
        toast({
          description: "Error fetching contacts",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    };
    fetchContacts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 w-full items-center">
        <div className="flex w-full  gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="pl-10 text-md"
            />
          </div>
          <Link href="/contacts/new">
            <Button size={"icon"}>
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div>
            <Loader className="animate-spin" />
          </div>
        ) : (
          <div className="space-y-4 w-full">
            {data && data.length > 0 && data
              .filter((item: any) => {
                const searchTerm = search.toLowerCase();
                return item?.user_name?.toLowerCase().includes(searchTerm);
                //   item.business_name.toLowerCase().includes(searchTerm)
              })
              .map((item: any) => (
                <Card key={item.user_catalog_id} className="py-2 px-2">
                  <CardContent className="space-y-[10px] px-2 py-2">
                    <h2 className="font-semibold text-md">{item.user_name}</h2>
                    <p className="text-md text-muted-foreground">
                      {item.designation}
                    </p>
                    <p className="flex items-center gap-2 text-md">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span>{item.user_email}</span>
                    </p>
                    <p className="flex items-center gap-2 text-md">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>{item.user_mobile}</span>
                    </p>
                    <p className="flex items-center gap-2 text-md">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{item.business_postcode}</span>
                    </p>
                    <p className="flex items-center gap-2 text-md">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <span>{item.department}</span>
                    </p>

                    <div className="flex justify-between items-center">
                      <p className="text-md flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-muted-foreground stroke-[1.5]" />
                        <span>{item.business_name}</span>
                      </p>
                      <div className="flex gap-1.5 md:gap-2 space-x-2">
                        <Link href={`/contacts/view/${item.user_catalog_id}`}>
                          <Eye className="h-5 w-5 text-muted-foreground stroke-[1.5] cursor-pointer hover:text-foreground" />
                        </Link>
                        <Link href={`/contacts/edit/${item.user_catalog_id}`}>
                          <Edit className="h-5 w-5 text-muted-foreground stroke-[1.5] cursor-pointer hover:text-foreground" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
