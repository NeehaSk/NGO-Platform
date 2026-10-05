import React from "react";
import prisma from "@/lib/prisma";
import { AdminGalleryManager } from "@/components/AdminGalleryManager";

export const metadata = {
  title: "Manage Gallery | Admin CMS",
};

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let images: any[] = [];
  try {
    images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB not connected yet:", err);
  }

  return <AdminGalleryManager initialImages={images} />;
}
