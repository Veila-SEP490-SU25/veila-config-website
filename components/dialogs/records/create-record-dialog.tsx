"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateRecordMutation } from "@/services/apis";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ICreateRecordDialogProps {
  secret: string;
  onCreate: () => void;
}

export const CreateRecordDialog = ({
  secret,
  onCreate,
}: ICreateRecordDialogProps) => {
  const [createRecord, { isLoading }] = useCreateRecordMutation();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleCreate = async () => {
    if (!key || !value) {
      toast.error("Key and value are required", {
        description: "Please fill in both fields.",
      });
      return;
    }
    try {
      const { statusCode, message } = await createRecord({
        secret,
        key,
        value,
      }).unwrap();
      if (statusCode === 201) {
        setOpen(false);
        setKey("");
        setValue("");
        onCreate();
        toast.success("Record created successfully", {
          description: "Your record has been created.",
        });
      } else {
        toast.error("Failed to create record", {
          description: message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error creating record:", error);
      toast.error("Failed to create record", {
        description: "Please try again later.",
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setKey("");
      setValue("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button className="w-full flex items-center gap-2">
          <Plus />
          <span>Create Record</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Record</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="w-full grid grid-cols-6 items-center gap-2">
            <div className="col-span-1">
              <Label className="w-full text-left">KEY</Label>
            </div>
            <div className="col-span-5">
              <Input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-6 items-center gap-2 mt-4">
            <div className="col-span-1">
              <Label className="w-full text-left">VALUE</Label>
            </div>
            <div className="col-span-5">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
