import React from "react";
import { AdminSidebar } from "@/components/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard | Noor Basha Muslim Charitable Trust",
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
