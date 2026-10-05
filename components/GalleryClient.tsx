"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  caption?: string | null;
  category: string;
}

const CATEGORIES = ["All", "Education", "Healthcare", "Community", "Relief"];

export function GalleryClient({ initialImages }: { initialImages: GalleryItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filteredImages =
    selectedCategory === "All"
      ? initialImages
      : initialImages.filter((img) => img.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-10">
      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#0F3E36] text-white shadow-xs"
                : "bg-white text-[#1E293B] border border-[#E5DFD7] hover:bg-[#FAF8F5]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setActiveImage(image)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-[#E5DFD7] bg-slate-100 shadow-xs hover:shadow-md transition-all"
          >
            <Image
              src={image.imageUrl}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-white">
              <span className="text-xs font-semibold text-[#D97736] uppercase tracking-wider">
                {image.category}
              </span>
              <h4 className="font-bold text-base leading-snug">{image.title}</h4>
              {image.caption && (
                <p className="text-xs text-white/80 line-clamp-2 mt-1">{image.caption}</p>
              )}
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-zinc-900">
              <Image
                src={activeImage.imageUrl}
                alt={activeImage.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-[#0F3E36] text-white">
              <span className="text-xs text-[#D97736] uppercase tracking-wider font-semibold">
                {activeImage.category}
              </span>
              <h3 className="font-serif text-xl font-bold mt-1">{activeImage.title}</h3>
              {activeImage.caption && (
                <p className="text-sm text-[#FAF8F5]/80 mt-1">{activeImage.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
