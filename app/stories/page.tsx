import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getStories } from "@/services/public-data";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Beneficiary Stories | Vijayawada Charitable Trust",
  description:
    "Real-life accounts of children, women, and elderly citizens empowered across Vijayawada and Andhra Pradesh.",
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#0F3E36] text-white py-16 text-center space-y-4">
        <Badge variant="accent">Grassroots Voices</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold">
          Stories of Hope & Transformation
        </h1>
        <p className="text-base text-[#FAF8F5]/80 max-w-2xl mx-auto px-4">
          Behind every metric is an individual with courage, ambition, and potential. Discover how compassionate support reshaped their trajectory.
        </p>
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl border border-[#E5DFD7] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-[16/9] relative w-full overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-[#64748B]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(story.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {story.author}
                      </span>
                    </div>
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#0F3E36] leading-snug">
                      {story.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#1E293B]/80 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#E5DFD7]">
                    <Link
                      href={`/stories/${story.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0F3E36] hover:text-[#D97736] transition-colors"
                    >
                      Read Beneficiary Journey <ArrowRight className="w-4 h-4" />
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
