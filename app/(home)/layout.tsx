
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="w-full">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
