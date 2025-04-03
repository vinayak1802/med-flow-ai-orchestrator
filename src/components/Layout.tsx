
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "@/components/MainSidebar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MainSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4 md:px-6">{children}</div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};
