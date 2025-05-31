"use client";

import { Roboto_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme.provider";
import { StoreProvider } from "@/providers/store.provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/auth.provider";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sourceCodePro.variable} ${robotoMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" enableSystem>
          <StoreProvider>
            <AuthProvider>{children}</AuthProvider>
          </StoreProvider>
          <Toaster
            position="top-right"
            duration={3500}
            expand={true}
            visibleToasts={3}
            gap={5}
            richColors={true}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
