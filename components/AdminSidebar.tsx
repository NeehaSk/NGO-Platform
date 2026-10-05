"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  HeartHandshake,
  BookOpen,
  MessageSquareQuote,
  Calendar,
  Image as ImageIcon,
  Users,
  Inbox,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Donations", href: "/admin/donations", icon: HeartHandshake },
  { name: "Programs", href: "/admin/programs", icon: BookOpen },
  { name: "Stories", href: "/admin/stories", icon: MessageSquareQuote },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Volunteers", href: "/admin/volunteers", icon: Users },
  { name: "Messages", href: "/admin/messages", icon: Inbox },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0F3E36] text-white flex flex-col shrink-0 min-h-screen border-r border-[#134E48]">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#134E48] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#134E48] border border-[#D97736] flex items-center justify-center font-bold text-xs tracking-tighter text-[#D97736]">
            NBMCT
          </div>
          <div>
            <h2 className="font-serif font-bold text-sm tracking-tight">Trust CMS</h2>
            <p className="text-[10px] text-[#FAF8F5]/60 uppercase tracking-wider">
              Staff Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#D97736] text-white shadow-xs font-semibold"
                  : "text-[#FAF8F5]/80 hover:bg-[#134E48] hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom links & logout */}
      <div className="p-4 border-t border-[#134E48] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-[#FAF8F5]/70 hover:bg-[#134E48] hover:text-white transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
