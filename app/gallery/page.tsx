import React from "react";
import { getGalleryImages } from "@/services/public-data";
import { Badge } from "@/components/ui/badge";
import { GalleryClient } from "@/components/GalleryClient";

export const metadata = {
  title: "Field Photo Gallery | Noor Basha Muslim Charitable Trust",
  description:
    "Glimpses into our on-ground education programs, medical diagnostic camps, and relief work in Vijayawada.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#0F3E36] text-white py-16 text-center space-y-4">
        <Badge variant="accent">Moments on Ground</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold">
          Field Photo Gallery
        </h1>
        <p className="text-base text-[#FAF8F5]/80 max-w-2xl mx-auto px-4">
          Capturing genuine moments of empowerment, study sessions, medical drives, and community fellowship across Krishna district.
        </p>
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryClient initialImages={images} />
        </div>
      </section>
    </div>
  );
}
