"use client";

import { AppSidebarContent } from "@/components/sidebar/app-sidebar-content";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/auth.provider";
import { LogOutIcon, Settings, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AppSidebar = () => {
  const { isAuthenticating, logout, currentUser, isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);
  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="font-source bg-white"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="cursor-pointer">
              <Link href="/">
                <Settings />
                <span>Configuration</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <AppSidebarContent />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        {isAuthenticating ? (
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
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <User2 />
                <span>{currentUser?.username}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer text-red-500 hover:bg-red-500 hover:text-white">
                <LogOutIcon className="" />
                <span onClick={logout} className="cursor-pointer">
                  Logout
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
