"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateRecordMutation } from "@/services/apis";
import { IRecord } from "@/services/types";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IUpdateRecordDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  record: IRecord;
  secret: string;
  onUpdate: () => void;
}

export const UpdateRecordDialog = ({
  open,
  setOpen,
  record,
  onUpdate,
  secret
}: IUpdateRecordDialogProps) => {
  const [updateRecord, { isLoading }] = useUpdateRecordMutation();
  const [key, setKey] = useState(record.key);
  const [value, setValue] = useState(record.value);

  useEffect(() => {
    if (open) {
      setKey(record.key);
      setValue(record.value);
    }
  },[record, open])

  const handleUpdate = async () => {
    if (!key || !value) {
      toast.error("Key and value are required", {
        description: "Please fill in both fields.",
      });
      return;
    }
    try {
      const { statusCode, message } = await updateRecord({
        secret,
        key,
        value,
      }).unwrap();
      if (statusCode === 200) {
        setOpen(false);
        setKey("");
        setValue("");
        onUpdate();
        toast.success("Record updated successfully", {
          description: "Your record has been created.",
        });
      } else {
        toast.error("Failed to update record", {
          description: message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error updating record:", error);
      toast.error("Failed to update record", {
        description: "Please try again later.",
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Record</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="w-full grid grid-cols-6 items-center gap-2">
            <div className="col-span-1">
              <
                Label className="w-full text-left">KEY</Label>
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
          <Button onClick={handleUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
