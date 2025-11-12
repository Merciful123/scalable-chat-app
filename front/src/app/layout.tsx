import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../lib/utils";


const fontSans = FontSans({
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "QuickChat",
  description: "Chatting as quick as possible",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
        </body>
    </html>
  );
}
