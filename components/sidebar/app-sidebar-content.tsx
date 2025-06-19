"use client";

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useLazyGetProfilesQuery } from "@/services/apis";
import { IProfile } from "@/services/types";
import { Plus, PlusIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AppSidebarContent = () => {
  const [getProfiles, { isLoading }] = useLazyGetProfilesQuery();
  const [profiles, setProfiles] = useState<IProfile[]>([]);

  const fetchProfiles = async () => {
    try {
      const { items, statusCode } = await getProfiles({
        pageIndex: 1,
        pageSize: 100,
      }).unwrap();
      if (statusCode === 200) {
        setProfiles(items);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm">Profiles</SidebarGroupLabel>
      <SidebarGroupAction
        title="Add Profile"
        className="hover:bg-black hover:text-white rounded-full"
      >
        <PlusIcon />
      </SidebarGroupAction>
      <SidebarGroupContent>
        {isLoading ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="w-full grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <Skeleton className="aspect-square w-full rounded-full bg-gray-300" />
                </div>
                <div className="col-span-3 flex flex-col items-start justify-center gap-2">
                  <Skeleton className="h-1/2 w-full bg-gray-300" />
                  <Skeleton className="h-1/2 w-2/3 bg-gray-300" />
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            {profiles.length > 0 ? (
              profiles.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild className="cursor-pointer">
                    <Link href="/">{item.name}</Link>
                  </SidebarMenuButton>
                  <SidebarMenuAction
                    title="Delete Profile"
                    className="hover:bg-red-500 hover:text-white rounded-full"
                  >
                    <Trash2 />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link href="/profiles/create" className="flex items-center">
                    <Plus className="mr-2 w-4 h-4" />
                    Create Profile
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
