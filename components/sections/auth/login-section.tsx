"use client";
import { LoginForm } from "@/components/sections/auth/login-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export const LoginSection = () => {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-cyan-100 font-roboto">
      <Card className="w-[80%] max-w-[80vw] max-h-[80vh] overflow-hidden py-6 px-4 shadow-lg">
        <CardHeader className="text-center text-2xl font-semibold">
          Login to Continue
        </CardHeader>
        <CardContent className="w-full">
          <ScrollArea className="h-full w-full">
            <LoginForm />
            <Separator className="my-2" />
            <div className="flex items-center justify-center text-xs font-light gap-2">
              <p>Don't have an account?</p>
              <Button
                variant="link"
                className="p-0 font-light text-xs cursor-pointer"
                onClick={() => {
                  router.push("/register");
                }}
              >
                Register now
              </Button>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
