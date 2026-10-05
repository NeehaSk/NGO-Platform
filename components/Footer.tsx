import React from "react";
import Link from "next/link";
import { Heart, MapPin, Phone, Mail, ShieldCheck, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F3E36] text-[#FAF8F5] border-t border-[#134E48]">
      {/* 80G Tax Exemption & Trust Announcement Banner */}
      <div className="bg-[#134E48] py-4 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D97736] shrink-0" />
            <p className="text-[#FAF8F5]/90">
              <strong className="text-white">Tax Exemption Notice:</strong> Donations are eligible for tax deduction benefits under Section 80G of the Indian Income Tax Act. (Registration No. [Pending/Placeholder: 12A/80G/AP/2026]).
            </p>
          </div>
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97736] hover:text-white transition-colors bg-black/20 px-3 py-1.5 rounded"
          >
            Claim 80G Receipt <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Trust Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#134E48] flex items-center justify-center text-white font-bold text-base border-2 border-[#D97736]">
                VCT
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                Vijayawada Charitable Trust
              </span>
            </div>
            <p className="text-sm text-[#FAF8F5]/80 leading-relaxed">
              Dedicated to uplifting underprivileged communities across Vijayawada, Krishna district, and Andhra Pradesh through grassroots education, preventive health camps, and women empowerment initiatives.
            </p>
            <div className="text-xs text-[#FAF8F5]/60 pt-2 space-y-1">
              <p>Registered Public Charitable Trust</p>
              <p>Reg No: [Placeholder / District Registrar, Vijayawada]</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-base tracking-wide mb-4">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm text-[#FAF8F5]/80">
              <li>
                <Link href="/about" className="hover:text-[#D97736] transition-colors">
                  About the Trust & Mission
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-[#D97736] transition-colors">
                  Our Community Programs
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-[#D97736] transition-colors">
                  Impact & Transparency Reports
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[#D97736] transition-colors">
                  Beneficiary Stories
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#D97736] transition-colors">
                  Field Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#D97736] transition-colors">
                  Upcoming Community Drives
                </Link>
              </li>
            </ul>
          </div>

          {/* Action & Engagement */}
          <div>
            <h3 className="font-semibold text-white text-base tracking-wide mb-4">Get Involved</h3>
            <ul className="space-y-2.5 text-sm text-[#FAF8F5]/80">
              <li>
                <Link href="/donate" className="hover:text-[#D97736] transition-colors flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#D97736]" /> Online Donation (Razorpay)
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-[#D97736] transition-colors">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D97736] transition-colors">
                  Partner with Us (CSR / NGO)
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#D97736] transition-colors">
                  Admin CMS Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-base tracking-wide mb-4">Headquarters</h3>
            <div className="flex items-start gap-3 text-sm text-[#FAF8F5]/80">
              <MapPin className="w-4 h-4 text-[#D97736] shrink-0 mt-1" />
              <span>[Placeholder Address: MG Road / Governorpet, Vijayawada, Krishna District, Andhra Pradesh - 520002, India]</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#FAF8F5]/80">
              <Phone className="w-4 h-4 text-[#D97736] shrink-0" />
              <span>[Placeholder: +91 866 2XXXXXX / +91 98480 XXXXX]</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#FAF8F5]/80">
              <Mail className="w-4 h-4 text-[#D97736] shrink-0" />
              <span>[Placeholder: contact@charitabletrust-vijayawada.org]</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimers */}
        <div className="mt-12 pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF8F5]/60 gap-4">
          <p>© {new Date().getFullYear()} Vijayawada Charitable Trust. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built with Next.js & PostgreSQL</span>
            <span>Nonprofit Compliance Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
