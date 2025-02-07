'use client'
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { AdminHeader } from "./components/header";
import { AdminSidebar } from "./components/sidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isHome = pathname.startsWith("/sign-in");
  const isStudio = pathname.startsWith("/studio");
  const  customize = !isHome && !isStudio
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
            <div className="min-h-screen">
           {customize && <AdminHeader />}
            <div className="flex">
              { customize && <AdminSidebar />}
              <main className="flex-1 p-8 bg-muted/40">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
