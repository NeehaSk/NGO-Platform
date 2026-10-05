import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Target, Eye, Users, FileCheck, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | Vijayawada Charitable Trust",
  description: "Learn about the mission, vision, governance, and transparent community interventions of Vijayawada Charitable Trust.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section className="bg-[#0F3E36] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="accent">Our History & Purpose</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Serving Vijayawada with Integrity & Heart
          </h1>
          <p className="text-base sm:text-lg text-[#FAF8F5]/80 max-w-2xl mx-auto">
            Founded with an enduring conviction: every human deserves equal dignity, healthcare, and educational opportunity regardless of socioeconomic birth.
          </p>
        </div>
      </section>

      {/* Origin & Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-bold text-[#D97736] tracking-wider">
                The Inception
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0F3E36]">
                From Local Relief to Systematic Grassroots Change
              </h2>
              <p className="text-base text-[#1E293B]/80 leading-relaxed">
                What began in Vijayawada as an ad-hoc emergency food and medicine relief initiative during seasonal Krishna river floods has evolved into a registered public charitable trust. Over eight years of structured field work, we identified that sporadic handouts do not break cycles of generational poverty.
              </p>
              <p className="text-base text-[#1E293B]/80 leading-relaxed">
                Today, our trustees, program directors, and volunteer brigade channel every rupee into targeted interventions: comprehensive educational sponsorship for primary schoolers, regular health camps for geriatric laborers, and market-ready vocational skills for rural women.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#E5DFD7]">
                <Image
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop"
                  alt="Vijayawada community gathering"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#FAF8F5] border-y border-[#E5DFD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white rounded-xl border border-[#E5DFD7] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#0F3E36] flex items-center justify-center text-white">
                <Target className="w-6 h-6 text-[#D97736]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F3E36]">Our Mission</h3>
              <p className="text-sm sm:text-base text-[#1E293B]/80 leading-relaxed">
                To mobilize civic empathy, institutional partnerships, and local volunteer networks across Andhra Pradesh to deliver uncompromised education, preventive diagnostics, and dignified livelihood pathways to the most vulnerable habitations.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl border border-[#E5DFD7] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#0F3E36] flex items-center justify-center text-white">
                <Eye className="w-6 h-6 text-[#D97736]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F3E36]">Our Vision</h3>
              <p className="text-sm sm:text-base text-[#1E293B]/80 leading-relaxed">
                An Andhra Pradesh where no child abandons schooling due to lack of study supplies, no senior citizen suffers from preventable blindness or chronic disease without care, and every woman has the financial self-sufficiency to direct her family’s future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Accountability Disclaimers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <Badge variant="default">Statutory Governance</Badge>
            <h2 className="font-serif text-3xl font-bold text-[#0F3E36]">
              Trust, Transparency & Compliance
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              We operate under strict statutory guidelines with transparent auditing to ensure that donor contributions reach their intended beneficiaries without dilution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-[#E5DFD7] bg-[#FAF8F5] space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#0F3E36] mb-2" />
              <h4 className="font-bold text-[#0F3E36] text-base">Section 80G Tax Exemption</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                All Indian donations are eligible for a 50% tax deduction under Section 80G of the Income Tax Act. Instant 80G receipts with PAN details are dispatched via email upon confirmation.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E5DFD7] bg-[#FAF8F5] space-y-2">
              <FileCheck className="w-8 h-8 text-[#0F3E36] mb-2" />
              <h4 className="font-bold text-[#0F3E36] text-base">Section 12A Trust Registration</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Registered under Section 12A as an authentic charitable institution committed exclusively to non-profit public welfare activities across Andhra Pradesh.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E5DFD7] bg-[#FAF8F5] space-y-2">
              <Users className="w-8 h-8 text-[#0F3E36] mb-2" />
              <h4 className="font-bold text-[#0F3E36] text-base">Community Advisory Board</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Guided by retired educators, local healthcare practitioners, and social workers residing in Vijayawada who provide uncompensated oversight and ethical stewardship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-[#FAF8F5] border-t border-[#E5DFD7] text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F3E36]">
            Want to collaborate, inspect our records, or visit our Vijayawada projects?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary">Contact Our Office</Button>
            </Link>
            <Link href="/donate">
              <Button variant="accent">Support Our Initiatives</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
