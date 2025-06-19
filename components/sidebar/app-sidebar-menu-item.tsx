"use client";
import { DeleteConfirmDialog } from "@/components/dialogs/delete-confirm-dialog";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDeleteProfileMutation } from "@/services/apis";
import { IProfile } from "@/services/types";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface AppSidebarMenuItemProps {
  profile: IProfile;
  onDelete: () => void;
}

export const AppSidebarMenuItem = ({
  profile,
  onDelete,
}: AppSidebarMenuItemProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteProfile, { isLoading }] = useDeleteProfileMutation();

  const handleDelete = async () => {
    try {
      const { statusCode, message } = await deleteProfile({
        profileId: profile.id,
      }).unwrap();
      if (statusCode === 200) {
        onDelete();
        toast.success("Profile deleted successfully");
      } else {
        toast.error("Failed to delete profile", {
          description: message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error delete profile", error);
    }
  };

  return (
    <SidebarMenuItem>
      <Link href={`/profiles/${profile.id}`}>
        <SidebarMenuButton className="w-full">
          <span className="text-sm">{profile.name}</span>
        </SidebarMenuButton>
      </Link>
      <SidebarMenuAction
        title="Delete Profile"
        onClick={() => setIsDeleteDialogOpen(true)}
        className="hover:bg-red-500 hover:text-white rounded-full"
        disabled={isLoading}
      >
        <Trash2 />
      </SidebarMenuAction>
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        handleDelete={() => {
          handleDelete();
          setIsDeleteDialogOpen(false);
        }}
      />
    </SidebarMenuItem>
  );
};
