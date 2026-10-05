import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/services/public-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowLeft, Users, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.title} | Noor Basha Muslim Charitable Trust`,
    description: event.description.slice(0, 160),
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#FAF8F5] border-b border-[#E5DFD7] py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F3E36] hover:text-[#D97736]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Events
          </Link>
        </div>
      </div>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="space-y-4">
            <Badge variant="accent">{event.status}</Badge>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F3E36] leading-tight">
              {event.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] text-sm text-[#1E293B]">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#D97736] shrink-0" />
                <div>
                  <span className="text-xs text-[#64748B] block">Date & Time</span>
                  <strong>{formatDate(event.eventDate)}</strong>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#D97736] shrink-0" />
                <div>
                  <span className="text-xs text-[#64748B] block">Location</span>
                  <strong>{event.location}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden shadow-md">
            <Image src={event.image} alt={event.title} fill priority className="object-cover" />
          </div>

          <div className="space-y-4 text-[#1E293B]/90 leading-relaxed whitespace-pre-line text-base sm:text-lg">
            {event.description}
          </div>

          <div className="p-8 bg-[#0F3E36] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif text-2xl font-bold">Want to participate or volunteer?</h3>
              <p className="text-xs sm:text-sm text-[#FAF8F5]/80">
                Join our volunteer roster for this drive and make a tangible local impact.
              </p>
            </div>
            <Link href="/volunteer">
              <Button variant="accent" size="lg" className="shrink-0 gap-2">
                <Users className="w-4 h-4" /> Sign Up as Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
