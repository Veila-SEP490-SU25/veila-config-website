"use client";

import { CreateProfileDialog } from "@/components/dialogs/profiles/create-profile-dialog";
import { AppSidebarMenuItem } from "@/components/sidebar/app-sidebar-menu-item";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useLazyGetProfilesQuery } from "@/services/apis";
import { IProfile } from "@/services/types";
import { Plus, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export const AppSidebarContent = () => {
  const [getProfiles, { isLoading }] = useLazyGetProfilesQuery();
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const fetchProfiles = useCallback(async () => {
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
  }, [getProfiles]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm">Profiles</SidebarGroupLabel>
      <SidebarGroupAction
        title="Add Profile"
        className="hover:bg-black hover:text-white rounded-full"
        onClick={() => setIsCreateDialogOpen(true)}
      >
        <PlusIcon />
      </SidebarGroupAction>
      <SidebarGroupContent>
        {isLoading ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="w-full grid grid-cols-6 gap-2">
                <div className="col-span-1">
                  <Skeleton className="aspect-square w-full rounded-full bg-gray-300" />
                </div>
                <div className="col-span-5 flex flex-col items-start justify-center gap-2">
                  <Skeleton className="h-full w-full bg-gray-300" />
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            {profiles.length > 0 ? (
              profiles.map((item) => (
                <AppSidebarMenuItem
                  key={item.id}
                  profile={item}
                  onDelete={fetchProfiles}
                />
              ))
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="cursor-pointer"
                >
                  <Plus className="mr-2 w-4 h-4" />
                  Create Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
      <CreateProfileDialog
        open={isCreateDialogOpen}
        setOpen={setIsCreateDialogOpen}
        onCreate={fetchProfiles}
      />
    </SidebarGroup>
  );
};
