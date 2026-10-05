import React from "react";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact Us | Vijayawada Charitable Trust",
  description:
    "Get in touch with our administrative and field offices in Vijayawada, Krishna district, Andhra Pradesh.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#0F3E36] text-white py-16 text-center space-y-4">
        <Badge variant="accent">Connect With Us</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold">
          Contact Our Vijayawada Office
        </h1>
        <p className="text-base text-[#FAF8F5]/80 max-w-2xl mx-auto px-4">
          Have questions regarding our ongoing programs, 80G tax receipts, CSR partnerships, or volunteering? We welcome your correspondence.
        </p>
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Info & Map placeholder */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-[#E5DFD7] space-y-6 shadow-xs">
                <h3 className="font-serif text-2xl font-bold text-[#0F3E36]">
                  Trust Headquarters
                </h3>

                <div className="space-y-4 text-sm text-[#1E293B]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#D97736] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-[#0F3E36]">Registered Address:</strong>
                      <span>
                        [Placeholder: Door No. 29-4-12, MG Road / Governorpet, Vijayawada, Krishna District, Andhra Pradesh - 520002, India]
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#D97736] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-[#0F3E36]">Phone / Helpdesk:</strong>
                      <span>[Placeholder: +91 866 245XXXX / +91 98480 XXXXX]</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#D97736] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-[#0F3E36]">Email Support:</strong>
                      <span>contact@charitabletrust-vijayawada.org</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#D97736] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-[#0F3E36]">Office Hours:</strong>
                      <span>Monday to Saturday: 9:30 AM – 5:30 PM IST</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5DFD7] flex items-center gap-2 text-xs text-[#64748B]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Public Charitable Institution (AP Reg. Acts)</span>
                </div>
              </div>

              {/* Map embed placeholder */}
              <div className="bg-white p-4 rounded-2xl border border-[#E5DFD7] text-center space-y-2">
                <div className="aspect-[16/9] w-full rounded-xl bg-slate-100 flex flex-col items-center justify-center border border-dashed border-[#E5DFD7] p-4 text-[#64748B]">
                  <MapPin className="w-8 h-8 text-[#D97736] mb-2" />
                  <p className="font-semibold text-xs text-[#0F3E36]">Vijayawada Central Location Map</p>
                  <p className="text-[11px] max-w-xs">
                    Interactive Google Maps embed will load here upon production deployment.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DFD7] shadow-xs">
              <div className="mb-6 space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#0F3E36]">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Fill out the form below and our coordination team will get back to you shortly.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
