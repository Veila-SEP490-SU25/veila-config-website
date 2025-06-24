"use client";

import { DeleteConfirmDialog } from "@/components/dialogs/delete-confirm-dialog";
import { UpdateRecordDialog } from "@/components/dialogs/records/update-record-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteRecordMutation,
  useUpdateRecordMutation,
} from "@/services/apis";
import { IRecord } from "@/services/types";
import { profile } from "console";
import { Pencil, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface RecordsCardProps {
  secret: string;
  records: IRecord[];
  onChange: () => void;
}

export const RecordsCard = ({
  records,
  onChange,
  secret,
}: RecordsCardProps) => {
  const [deleteRecord, { isLoading: isDeleting }] = useDeleteRecordMutation();
  const [selectedRecord, setSelectedRecord] = useState<IRecord | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const handleDeleteRecord = useCallback(async () => {
    if (!selectedRecord) return;
    try {
      const { statusCode, message } = await deleteRecord({
        secret: secret,
        key: selectedRecord.key,
      }).unwrap();
      if (statusCode === 200) {
        onChange();
        toast.success("Record deleted successfully");
        setSelectedRecord(null);
      } else {
        toast.error("Failed to delete record", {
          description: message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  }, [selectedRecord]);

  return (
    <Card className="w-full h-full overflow-hidden p-0">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id} className="max-w-full">
              <TableCell className="w-1/5">
                <div className="w-full flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedRecord(record);
                      setIsUpdateDialogOpen(true);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={isDeleting}
                    onClick={() => {
                      setSelectedRecord(record);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="w-2/5">{record.key}</TableCell>
              <TableCell className="w-2/5 break-words">
                {record.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteConfirmDialog
        handleDelete={handleDeleteRecord}
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
      />
      {selectedRecord && <UpdateRecordDialog
        record={selectedRecord}
        secret={secret}
        open={isUpdateDialogOpen}
        setOpen={setIsUpdateDialogOpen}
        onUpdate={onChange}
      />}
    </Card>
  );
};
