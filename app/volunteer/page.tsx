import React from "react";
import { Badge } from "@/components/ui/badge";
import { VolunteerForm } from "@/components/VolunteerForm";
import { Users, Clock, Award, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Volunteer with Us | Noor Basha Muslim Charitable Trust",
  description:
    "Join our committed brigade of volunteers driving education, healthcare camps, and women empowerment in Vijayawada.",
};

export default function VolunteerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#0F3E36] text-white py-16 text-center space-y-4">
        <Badge variant="accent">Be the Change</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold">
          Volunteer in Vijayawada & Krishna District
        </h1>
        <p className="text-base text-[#FAF8F5]/80 max-w-2xl mx-auto px-4">
          Every positive social movement is propelled by ordinary citizens who give their time and care. Join our volunteer network today.
        </p>
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Perks / Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase font-bold text-[#D97736] tracking-wider">
                  Why Volunteer With Us?
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F3E36]">
                  A Dignified, Safe & Meaningful Giving Experience
                </h2>
                <p className="text-sm text-[#1E293B]/80 leading-relaxed">
                  We treat our volunteers as core partners in development. Whether you are a student, professional, doctor, or homemaker, we match your skills to authentic local needs.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-white rounded-xl border border-[#E5DFD7]">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#0F3E36] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F3E36] text-sm">Flexible Commitments</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Participate in scheduled weekend medical camps or evening tutoring sessions without disrupting your work life.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white rounded-xl border border-[#E5DFD7]">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#0F3E36] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F3E36] text-sm">Volunteer Certification</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Official certificates of community service recognizing hours completed, suitable for college and career portfolios.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white rounded-xl border border-[#E5DFD7]">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#0F3E36] shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F3E36] text-sm">Community Fellowship</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Connect with like-minded civic leaders and compassionate youth striving for a better Vijayawada.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Application Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DFD7] shadow-xs">
              <div className="mb-6 space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#0F3E36]">
                  Volunteer Application Form
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Please fill in your details below. We respect your privacy and never share your contact information.
                </p>
              </div>
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
