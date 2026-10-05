import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getEvents } from "@/services/public-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "DDU-GKY Admissions & Events | Noor Basha Muslim Charitable Trust",
  description:
    "Participate in upcoming medical screening camps, cleanliness drives, and educational kit distributions in Vijayawada.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#0F3E36] text-white py-16 text-center space-y-4">
        <Badge variant="accent">Upcoming Drives</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold">
          Events & Community Drives
        </h1>
        <p className="text-base text-[#FAF8F5]/80 max-w-2xl mx-auto px-4">
          Join our weekend drives, volunteer for health camps, and witness direct community interventions happening across Vijayawada.
        </p>
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-[#E5DFD7] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-[16/9] relative w-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#0F3E36] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Calendar className="w-3.5 h-3.5 text-[#D97736]" />
                    {formatDate(event.eventDate)}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                      <MapPin className="w-3.5 h-3.5 text-[#D97736]" />
                      <span>{event.location}</span>
                    </div>
                    <h2 className="font-serif font-bold text-xl text-[#0F3E36] leading-snug">
                      {event.title}
                    </h2>
                    <p className="text-sm text-[#1E293B]/80 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5DFD7] flex items-center justify-between">
                    <Link
                      href={`/events/${event.slug}`}
                      className="text-sm font-bold text-[#0F3E36] hover:text-[#D97736] inline-flex items-center gap-1"
                    >
                      View Event Details <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/volunteer">
                      <Button variant="outline" size="sm">
                        Volunteer
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
