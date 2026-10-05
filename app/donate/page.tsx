import React from "react";
import { Badge } from "@/components/ui/badge";
import { DonationForm } from "@/components/DonationForm";
import { ShieldCheck, Heart, Award, FileCheck } from "lucide-react";

export const metadata = {
  title: "Donate Online | Vijayawada Charitable Trust",
  description:
    "Make an online 80G tax-deductible donation to Vijayawada Charitable Trust via Razorpay (Cards, UPI, Netbanking).",
};

interface DonatePageProps {
  searchParams: Promise<{ program?: string }>;
}

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const { program } = await searchParams;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#0F3E36] text-white py-16 text-center space-y-4">
        <Badge variant="accent">Tax-Deductible Contribution</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold">
          Make a Life-Changing Donation
        </h1>
        <p className="text-base text-[#FAF8F5]/80 max-w-2xl mx-auto px-4">
          Every contribution goes directly to verified grassroots welfare programs in Vijayawada and surrounding rural habitations.
        </p>
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Trust Proof & 80G Benefits */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-[#E5DFD7] space-y-5 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0F3E36] flex items-center justify-center text-[#D97736]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F3E36]">
                      Section 80G Tax Exemption
                    </h3>
                    <span className="text-xs text-[#64748B]">Income Tax Act of India</span>
                  </div>
                </div>

                <p className="text-sm text-[#1E293B]/80 leading-relaxed">
                  Donations to Vijayawada Charitable Trust qualify for 50% deduction under Section 80G. Ensure you enter your valid 10-character PAN to receive an official Form 10BE tax certificate.
                </p>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-2 text-xs text-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant Digital Receipt via Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Audited Financial Statements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Encrypted Razorpay Payment Gateway</span>
                  </div>
                </div>
              </div>

              {/* Impact Tiers */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5DFD7] space-y-3 shadow-xs">
                <h4 className="font-bold text-[#0F3E36] text-sm uppercase tracking-wider">
                  How Your Gift Creates Change
                </h4>
                <ul className="space-y-2.5 text-xs text-[#1E293B]/80">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#D97736] shrink-0">₹1,000:</span>
                    <span>Provides full academic supplies and uniforms for one primary school student for a full term.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#D97736] shrink-0">₹2,500:</span>
                    <span>Sponsors free blood tests and vital geriatric medication for 5 senior citizens at medical camps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#D97736] shrink-0">₹5,000:</span>
                    <span>Covers vocational tailoring kit and 3-month certification course for an underprivileged woman.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Donation Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DFD7] shadow-xs">
              <div className="mb-6 space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#0F3E36]">
                  Online Donation Form
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Supports UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking across all Indian banks.
                </p>
              </div>
              <DonationForm preselectedProgram={program} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
