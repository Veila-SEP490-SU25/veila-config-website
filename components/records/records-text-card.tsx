"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IRecord } from "@/services/types";
import { Copy, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface RecordsTextCardProps {
  records: IRecord[];
}

export const RecordsTextCard = ({ records }: RecordsTextCardProps) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const formattedText = records
      .map((record) => `${record.key}=${record.value}`)
      .join("\n");
    setText(formattedText);
  }, [records]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Records copied to clipboard");
    } catch (error) {
      console.error("Failed to copy records:", error);
      toast.error("Failed to copy records");
    }
  };

  const handleDownload = async () => {
    // Create a Blob with the content
    const blob = new Blob([text], { type: "text/plain" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = ".env"; // Name of the file to download

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full bg-gray-100 h-full">
      <CardHeader className="flex items-center justify-start gap-2">
        <Button variant="outline" size="icon" onClick={handleCopy}>
          <Copy />
        </Button>
        <Button variant="outline" size="icon" onClick={handleDownload}>
          <Download />
        </Button>
      </CardHeader>
      <CardContent>
        {records.map((record) => (
          <p key={record.id} className="w-full break-words p-1">{`${record.key}=${record.value}`}</p>
        ))}
      </CardContent>
    </Card>
  );
};
