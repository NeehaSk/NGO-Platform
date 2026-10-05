"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ShieldCheck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Impact", href: "/impact" },
  { name: "Stories", href: "/stories" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide public header inside admin views
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DFD7]">
      {/* Top micro-bar for trust & locality */}
      <div className="bg-[#0F3E36] text-[#FAF8F5] text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center tracking-wide">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#D97736]" />
          <span>Serving Vijayawada & Rural Andhra Pradesh</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#FAF8F5]/80">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Registered Charitable Trust • 80G Tax Deductible
          </span>
          <Link href="/admin/login" className="hover:text-white transition-colors underline underline-offset-2">
            Staff Portal
          </Link>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* NGO Brand & Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-[#0F3E36] flex items-center justify-center text-white font-bold text-lg border-2 border-[#D97736] shadow-sm group-hover:bg-[#134E48] transition-colors">
            VCT
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#0F3E36] group-hover:text-[#134E48] transition-colors">
              Vijayawada Charitable Trust
            </span>
            <span className="text-[11px] text-[#64748B] font-medium tracking-wide">
              Registered NGO in Andhra Pradesh
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-[#0F3E36] font-semibold bg-[#EFEAE4]"
                    : "text-[#1E293B]/80 hover:text-[#0F3E36] hover:bg-[#EFEAE4]/50"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Donate CTA button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/donate">
            <Button variant="accent" size="sm" className="gap-2 shadow-sm font-semibold">
              <Heart className="w-4 h-4 fill-white text-white" />
              Donate Now
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href="/donate">
            <Button variant="accent" size="sm" className="gap-1.5 px-3 py-1.5 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 fill-white" />
              Donate
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0F3E36] hover:bg-[#EFEAE4] rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5DFD7] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-md text-base font-medium transition-colors",
                  isActive
                    ? "bg-[#0F3E36] text-[#FAF8F5]"
                    : "text-[#1E293B] hover:bg-[#EFEAE4] hover:text-[#0F3E36]"
                )}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#E5DFD7] mt-3 space-y-2">
            <Link href="/donate" onClick={() => setMobileMenuOpen(false)} className="block w-full">
              <Button variant="accent" className="w-full justify-center gap-2">
                <Heart className="w-4 h-4 fill-white" />
                Make a Tax-Deductible Donation
              </Button>
            </Link>
            <div className="text-center pt-2">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#64748B] hover:text-[#0F3E36] underline"
              >
                Administrator / Staff Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
