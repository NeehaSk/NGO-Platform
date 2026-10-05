import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getImpactStatistics } from "@/services/public-data";
import { formatINR } from "@/lib/utils";
import { ShieldCheck, BarChart3, Users, HeartHandshake, MapPin } from "lucide-react";

export const metadata = {
  title: "Impact & Transparency | Noor Basha Muslim Charitable Trust",
  description:
    "View our audited community impact, fund allocations, and reach across Vijayawada, Krishna district, and Andhra Pradesh.",
};

export default async function ImpactPage() {
  const stats = await getImpactStatistics();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#0F3E36] text-white py-16 text-center space-y-4">
        <Badge variant="accent">Measurable Outcomes</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold">
          Impact & Transparency
        </h1>
        <p className="text-base text-[#FAF8F5]/80 max-w-2xl mx-auto px-4">
          Every rupee entrusted to our public charitable trust is tracked and channeled into audited welfare interventions.
        </p>
      </section>

      {/* Primary KPI Grid */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-[#E5DFD7] shadow-xs space-y-2">
              <Users className="w-8 h-8 text-[#0F3E36] mb-3" />
              <div className="text-4xl font-extrabold text-[#0F3E36] font-serif">
                {stats.peopleHelped.toLocaleString("en-IN")}+
              </div>
              <h3 className="font-bold text-base text-[#1E293B]">Direct Beneficiaries</h3>
              <p className="text-xs text-[#64748B]">
                School children sponsored, elderly patients screened, and women certified in market skills.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-[#E5DFD7] shadow-xs space-y-2">
              <MapPin className="w-8 h-8 text-[#0F3E36] mb-3" />
              <div className="text-4xl font-extrabold text-[#0F3E36] font-serif">
                {stats.communitiesReached} Wards & Villages
              </div>
              <h3 className="font-bold text-base text-[#1E293B]">Geographic Footprint</h3>
              <p className="text-xs text-[#64748B]">
                Covering Krishna Lanka, Ibrahimpatnam, Bhavanipuram, Penamaluru, and surrounding Krishna rural areas.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-[#E5DFD7] shadow-xs space-y-2">
              <HeartHandshake className="w-8 h-8 text-[#0F3E36] mb-3" />
              <div className="text-4xl font-extrabold text-[#D97736] font-serif">
                {formatINR(stats.fundsMobilized)}
              </div>
              <h3 className="font-bold text-base text-[#1E293B]">Community Aid Mobilized</h3>
              <p className="text-xs text-[#64748B]">
                100% accounted and distributed for verified educational grants, health diagnostic supplies, and relief packs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fund Utilization Breakdown */}
      <section className="py-16 bg-white border-t border-[#E5DFD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <Badge variant="default">Financial Stewardship</Badge>
            <h2 className="font-serif text-3xl font-bold text-[#0F3E36]">
              How Every Rupee Is Deployed
            </h2>
            <p className="text-sm text-[#64748B]">
              We adhere strictly to low administrative overheads so maximum support reaches the grassroots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <span className="text-3xl font-extrabold text-[#0F3E36]">45%</span>
              <h4 className="font-bold text-sm mt-2 text-[#1E293B]">Education & Scholarships</h4>
              <p className="text-xs text-[#64748B] mt-1">Textbooks, digital equipment, uniforms, tuition assistance</p>
            </div>
            <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <span className="text-3xl font-extrabold text-[#0F3E36]">30%</span>
              <h4 className="font-bold text-sm mt-2 text-[#1E293B]">Healthcare Camps</h4>
              <p className="text-xs text-[#64748B] mt-1">Diagnostic kits, eye surgeries, geriatric chronic medicines</p>
            </div>
            <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <span className="text-3xl font-extrabold text-[#0F3E36]">17%</span>
              <h4 className="font-bold text-sm mt-2 text-[#1E293B]">Women Vocational Livelihood</h4>
              <p className="text-xs text-[#64748B] mt-1">Sewing machines, raw materials, certification & micro-grants</p>
            </div>
            <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <span className="text-3xl font-extrabold text-[#D97736]">8%</span>
              <h4 className="font-bold text-sm mt-2 text-[#1E293B]">Admin & Compliance</h4>
              <p className="text-xs text-[#64748B] mt-1">Auditing, 80G filing, platform maintenance & bank charges</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#FAF8F5] border-t border-[#E5DFD7] text-center">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#0F3E36]">
            Partner in Creating Lasting Change
          </h2>
          <p className="text-sm text-[#64748B]">
            Support our programs today or collaborate with us as an institutional CSR donor.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link href="/donate">
              <Button variant="accent">Donate Online</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Request Audit Reports</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
