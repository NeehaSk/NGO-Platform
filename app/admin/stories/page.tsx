import React from "react";
import prisma from "@/lib/prisma";
import { AdminStoriesManager } from "@/components/AdminStoriesManager";

export const metadata = {
  title: "Manage Stories | Admin CMS",
};

export const dynamic = "force-dynamic";

export default async function AdminStoriesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let stories: any[] = [];
  try {
    stories = await prisma.story.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB not connected yet:", err);
  }

  return <AdminStoriesManager initialStories={stories} />;
}
