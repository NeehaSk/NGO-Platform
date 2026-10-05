import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgramBySlug, getPrograms } from "@/services/public-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import { Heart, Users, Target, CheckCircle2, ArrowLeft } from "lucide-react";

interface ProgramDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program Not Found" };

  return {
    title: `${program.title} | Noor Basha Muslim Charitable Trust`,
    description: program.shortDescription,
  };
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const progress =
    program.targetAmount && program.raisedAmount
      ? Math.min(100, Math.round((program.raisedAmount / program.targetAmount) * 100))
      : 70;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Back button breadcrumb */}
      <div className="bg-[#FAF8F5] border-b border-[#E5DFD7] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F3E36] hover:text-[#D97736]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Programs
          </Link>
        </div>
      </div>

      {/* Program Hero */}
      <section className="bg-white py-12 border-b border-[#E5DFD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="accent">Active Program</Badge>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F3E36] leading-tight">
                {program.title}
              </h1>
              <p className="text-base sm:text-lg text-[#1E293B]/80 leading-relaxed">
                {program.shortDescription}
              </p>

              {/* Metrics bar */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#E5DFD7]">
                <div>
                  <span className="text-xs text-[#64748B] block">Target Goal</span>
                  <span className="text-lg font-bold text-[#0F3E36]">
                    {program.targetAmount ? formatINR(program.targetAmount) : "Ongoing"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#64748B] block">Funds Raised</span>
                  <span className="text-lg font-bold text-[#D97736]">
                    {program.raisedAmount ? formatINR(program.raisedAmount) : "₹0"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#64748B] block">Impacted Lives</span>
                  <span className="text-lg font-bold text-[#0F3E36]">
                    {program.beneficiaries || 100}+
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#E5DFD7]">
                <Image
                  src={program.coverImage}
                  alt={program.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Body & Donation CTA Sidebar */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DFD7] shadow-xs space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#0F3E36] border-b border-[#E5DFD7] pb-4">
                Detailed Program Blueprint & Interventions
              </h2>

              <div className="prose prose-emerald max-w-none text-[#1E293B]/90 space-y-4 whitespace-pre-line leading-relaxed">
                {program.description}
              </div>

              <div className="pt-6 border-t border-[#E5DFD7] space-y-4">
                <h3 className="font-bold text-[#0F3E36] text-lg">Our Commitment to Donors:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>80G Tax Deductible Receipts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Quarterly Field Reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct Vendor / Beneficiary Allocation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero Administrative Wastage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar CTA */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0F3E36] text-white p-6 rounded-2xl border border-emerald-900 shadow-md space-y-5 sticky top-28">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-[#D97736] tracking-wider">
                    Make a Difference
                  </span>
                  <h3 className="font-serif text-xl font-bold">Support This Program</h3>
                  <p className="text-xs text-[#FAF8F5]/80">
                    Your contribution directly finances supplies and interventions for {program.title}.
                  </p>
                </div>

                <div className="p-4 bg-[#134E48] rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>Campaign Target</span>
                    <span>{progress}% Reached</span>
                  </div>
                  <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#D97736] h-full rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <Link href={`/donate?program=${program.slug}`} className="block">
                  <Button variant="accent" size="lg" className="w-full gap-2">
                    <Heart className="w-4 h-4 fill-white" />
                    Donate to This Initiative
                  </Button>
                </Link>

                <div className="text-center">
                  <Link
                    href="/volunteer"
                    className="text-xs text-[#FAF8F5]/80 hover:text-white underline underline-offset-2"
                  >
                    Or sign up as a volunteer for this program
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
