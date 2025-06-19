"use client";

import { DeleteConfirmDialog } from "@/components/dialogs/delete-confirm-dialog";
import { CreateRecordDialog } from "@/components/dialogs/records/create-record-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useChangeProfileSecretMutation,
  useDeleteProfileMutation,
  useLazyGetProfileByIdQuery,
  useLazyGetRecordsQuery,
} from "@/services/apis";
import { IProfile, IRecord } from "@/services/types";
import { Copy, Eye, EyeClosed, RefreshCw, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const ProfileCard = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [getProfile, { isLoading: isProfileLoading }] =
    useLazyGetProfileByIdQuery();
  const [getRecords, { isLoading: isRecordsLoading }] =
    useLazyGetRecordsQuery();
  const [deleteProfile, { isLoading: isDeleting }] = useDeleteProfileMutation();
  const [changeSecret, { isLoading: isChanging }] =
    useChangeProfileSecretMutation();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [records, setRecords] = useState<IRecord[]>([]);
  const [isShowSecret, setIsShowSecret] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const { item, statusCode, message } = await getProfile({
        profileId: id,
      }).unwrap();
      if (statusCode === 200) {
        setProfile(item);
      } else {
        toast.error("Failed to fetch profile", {
          description: message || "Please try again later.",
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchRecords = async () => {
    try {
      if (!profile) return;
      const { items, statusCode, message } = await getRecords({
        secret: profile.secret,
      }).unwrap();
      if (statusCode === 200) {
        setRecords(items);
      } else {
        toast.error("Failed to fetch records", {
          description: message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleCopySecret = () => {
    if (profile) {
      navigator.clipboard
        .writeText(profile.secret)
        .then(() => {
          toast.success("Secret copied to clipboard");
        })
        .catch((error) => {
          console.error("Failed to copy secret:", error);
          toast.error("Failed to copy secret");
        });
    }
  };

  const handleDelete = async () => {
    try {
      if (!profile) return;
      const { statusCode, message } = await deleteProfile({
        profileId: profile.id,
      }).unwrap();
      if (statusCode === 200) {
        toast.success("Profile deleted successfully");
        router.push("/");
      } else {
        toast.error("Failed to delete profile", {
          description: message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error delete profile", error);
    }
  };

  const handleSecretChange = async () => {
    try {
      if (!profile) return;
      const { item, statusCode, message } = await changeSecret({
        profileId: profile.id,
      }).unwrap();
      if (statusCode === 200) {
        setProfile(item);
        toast.success("Secret changed successfully");
      } else {
        toast.error("Failed to change secret", {
          description: message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error changing secret:", error);
    }
  };

  useEffect(() => {
    if (id) fetchProfile();
  }, [id, router]);

  useEffect(() => {
    if (profile) fetchRecords();
  }, [profile]);

  return (
    <Card className="font-source">
      {isProfileLoading ? (
        <CardHeader>
          <Skeleton className="h-6 w-1/2 bg-gray-300" />
          <Skeleton className="h-6 w-full bg-gray-300" />
          <Skeleton className="h-6 w-full bg-gray-300" />
        </CardHeader>
      ) : (
        profile && (
          <CardHeader>
            <CardTitle>{profile.name}</CardTitle>
            <CardDescription className="p-2">
              <div className="w-full grid grid-cols-12 gap-2 items-center">
                <div className="col-span-2">
                  <Label>Secret:</Label>
                </div>
                <div className="col-span-7">
                  <Input
                    value={profile.secret}
                    type={isShowSecret ? "text" : "password"}
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setIsShowSecret(!isShowSecret)}
                    >
                      {isShowSecret ? <EyeClosed /> : <Eye />}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleCopySecret}
                    >
                      <Copy />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleSecretChange}
                      disabled={isChanging}
                    >
                      <RefreshCw className={isChanging ? "animate-spin" : ""} />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => setIsDeleteDialogOpen(true)}
                      disabled={isDeleting}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </div>
            </CardDescription>
            <DeleteConfirmDialog
              open={isDeleteDialogOpen}
              setOpen={setIsDeleteDialogOpen}
              handleDelete={handleDelete}
            />
          </CardHeader>
        )
      )}
      <Separator />
      <CardContent>
        <CardTitle className="flex items-center justify-between mb-2">
          <span>Records</span>
          {!isProfileLoading && profile && (
            <CreateRecordDialog
              secret={profile.secret}
              onCreate={fetchRecords}
            />
          )}
        </CardTitle>
        <CardDescription>
          {isRecordsLoading || isProfileLoading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-1/2 bg-gray-300" />
              <Skeleton className="h-6 w-full bg-gray-300" />
              <Skeleton className="h-6 w-full bg-gray-300" />
            </div>
          ) : (
            <div className="p-4 w-full flex item-center">
              {records.length > 0 ? (
                <div className="w-[80%]"></div>
              ) : (
                <div className="text-gray-500 text-center w-full">
                  This profile has records found
                </div>
              )}
            </div>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
