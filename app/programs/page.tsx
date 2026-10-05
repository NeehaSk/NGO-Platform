import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getPrograms } from "@/services/public-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";
import { Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Programs | Noor Basha Muslim Charitable Trust",
  description:
    "Explore our dedicated interventions in education, healthcare, and women livelihood across Vijayawada and Krishna district.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#0F3E36] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="accent">Our Interventions</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            Community-Driven Programs in Andhra Pradesh
          </h1>
          <p className="text-base text-[#FAF8F5]/80 max-w-2xl mx-auto">
            From rural schools in Krishna district to urban settlement wards of Vijayawada, we implement direct, impact-focused welfare initiatives.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const progress =
                program.targetAmount && program.raisedAmount
                  ? Math.min(100, Math.round((program.raisedAmount / program.targetAmount) * 100))
                  : 60;

              return (
                <Card key={program.id} className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[16/10] relative w-full overflow-hidden bg-slate-100">
                    <Image
                      src={program.coverImage}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <CardHeader className="space-y-2 flex-1">
                    <CardTitle className="text-xl font-bold">{program.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-3 leading-relaxed">
                      {program.shortDescription}
                    </CardDescription>

                    {program.targetAmount && (
                      <div className="pt-3 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#0F3E36]">
                            Raised: {formatINR(program.raisedAmount || 0)}
                          </span>
                          <span className="text-[#64748B]">{progress}%</span>
                        </div>
                        <div className="w-full bg-[#EFEAE4] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#D97736] h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-[#64748B]">
                          <span>Target: {formatINR(program.targetAmount)}</span>
                          <span>{program.beneficiaries || 100}+ Beneficiaries</span>
                        </div>
                      </div>
                    )}
                  </CardHeader>

                  <CardFooter className="pt-2 border-t border-[#E5DFD7]/60 flex gap-2">
                    <Link href={`/programs/${program.slug}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">
                        Details
                      </Button>
                    </Link>
                    <Link href={`/donate?program=${program.slug}`} className="flex-1">
                      <Button variant="accent" size="sm" className="w-full gap-1">
                        <Heart className="w-3.5 h-3.5 fill-white" /> Sponsor
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
