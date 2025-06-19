import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProfileMutation } from "@/services/apis";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CreateProfileDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreate: () => void;
}

export const CreateProfileDialog = ({
  open,
  setOpen,
  onCreate,
}: CreateProfileDialogProps) => {
  const [createProfile, { isLoading }] = useCreateProfileMutation();
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const { item, message, statusCode } = await createProfile({
        name,
      }).unwrap();
      if (statusCode == 201) {
        setName("");
        setOpen(false);
        onCreate();
        toast.success("Profile created successfully");
        router.push(`/profiles/${item.id}`);
      } else {
        toast.error("Failed to create profile", {
          description: message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  const handleCancel = () => {
    setName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create new configuration profile</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Label className="mb-2">Profile name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
