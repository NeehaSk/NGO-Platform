import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug } from "@/services/public-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Heart } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface StoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoryDetailPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story Not Found" };

  return {
    title: `${story.title} | Vijayawada Charitable Trust`,
    description: story.excerpt,
  };
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#FAF8F5] border-b border-[#E5DFD7] py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F3E36] hover:text-[#D97736]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Stories
          </Link>
        </div>
      </div>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="space-y-4">
            <Badge variant="accent">Beneficiary Account</Badge>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F3E36] leading-tight">
              {story.title}
            </h1>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-[#64748B] pt-2 border-b border-[#E5DFD7] pb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#D97736]" />
                {formatDate(story.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#D97736]" />
                {story.author}
              </span>
            </div>
          </div>

          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden shadow-md">
            <Image src={story.image} alt={story.title} fill priority className="object-cover" />
          </div>

          <div className="prose prose-lg max-w-none text-[#1E293B]/90 leading-relaxed whitespace-pre-line">
            {story.content}
          </div>

          {/* Bottom call to action */}
          <div className="p-8 bg-[#FAF8F5] rounded-2xl border border-[#E5DFD7] text-center space-y-4 mt-12">
            <h3 className="font-serif text-2xl font-bold text-[#0F3E36]">
              Help Us Create More Success Stories
            </h3>
            <p className="text-sm text-[#64748B] max-w-lg mx-auto">
              A modest regular gift or one-time donation funds life-saving medical screenings and school kits for children right here in Vijayawada.
            </p>
            <Link href="/donate" className="inline-block">
              <Button variant="accent" size="lg" className="gap-2">
                <Heart className="w-4 h-4 fill-white" /> Donate Now (80G Tax Deductible)
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
