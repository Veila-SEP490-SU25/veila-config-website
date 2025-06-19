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
import { Pencil, Trash2 } from "lucide-react";

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
  const [updateRecord, { isLoading: isUpdating }] = useUpdateRecordMutation();

  return (
    <Card className="w-full h-full overflow-hidden p-0">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Key</TableHead>
            <TableHead className="text-center">Value</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.key}</TableCell>
              <TableCell className="text-wrap">{record.value}</TableCell>
              <TableCell>
                <div className="w-full flex items-center justify-center gap-2">
                  <Button variant="outline" size="icon">
                    <Pencil />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
