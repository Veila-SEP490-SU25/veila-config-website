"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Info, TerminalSquare } from "lucide-react";
import { useCallback, useState } from "react";

interface IProfileInfoProps {
  secret: string;
}

export const ProfileInfo = ({ secret }: IProfileInfoProps) => {
  const [currentState, setCurrentState] = useState<
    "window" | "macos" | "linux"
  >("window");

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(getCommand());
  }, [secret]);

  const getCommand = useCallback(() => {
    switch (currentState) {
      case "window":
        return `curl.exe --silent -H "X-Secret-Key: ${secret}" https://api.config.veila.studio/api/record/env > .env`;
      case "macos":
        return `curl -H "X-Secret-Key: ${secret}" https://api.config.veila.studio/api/record/env > .env`;
      case "linux":
        return `curl -H "X-Secret-Key: ${secret}" https://api.config.veila.studio/api/record/env > .env`;
      default:
        return "";
    }
  }, [secret, currentState]);

  return (
    <Alert variant="default">
      <Info />
      <AlertTitle className="mb-2">
        You can call this in terminal to insert the record to secipfic file.
      </AlertTitle>
      <AlertDescription>
        <Tabs defaultValue={currentState as string} className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger
              value="window"
              onClick={() => setCurrentState("window")}
            >
              Window
            </TabsTrigger>
            <TabsTrigger value="macos" onClick={() => setCurrentState("macos")}>
              MacOS
            </TabsTrigger>
            <TabsTrigger value="linux" onClick={() => setCurrentState("linux")}>
              Linux
            </TabsTrigger>
          </TabsList>
          <TabsContent value="window">
            <Card className="w-full bg-gray-800 border-gray-900 p-2 gap-2">
              <CardTitle className="text-white flex items-center justify-between">
                <TerminalSquare className=" w-4 h-4" />
                <Button
                  variant="outline"
                  className="bg-transparent w-8 h-8 border-none"
                  size="icon"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription className="text-xs text-gray-400 px-2">
                {getCommand()}
              </CardDescription>
            </Card>
          </TabsContent>
          <TabsContent value="macos">
            <Card className="w-full bg-gray-800 border-gray-900 p-2 gap-2">
              <CardTitle className="text-white flex items-center justify-between">
                <TerminalSquare className=" w-4 h-4" />
                <Button
                  variant="outline"
                  className="bg-transparent w-8 h-8 border-none"
                  size="icon"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription className="text-xs text-gray-400 px-2">
                {getCommand()}
              </CardDescription>
            </Card>
          </TabsContent>
          <TabsContent value="linux">
            <Card className="w-full bg-gray-800 border-gray-900 p-2 gap-2">
              <CardTitle className="text-white flex items-center justify-between">
                <TerminalSquare className=" w-4 h-4" />
                <Button
                  variant="outline"
                  className="bg-transparent w-8 h-8 border-none"
                  size="icon"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription className="text-xs text-gray-400 px-2">
                {getCommand()}
              </CardDescription>
            </Card>
          </TabsContent>
        </Tabs>
      </AlertDescription>
    </Alert>
  );
};
