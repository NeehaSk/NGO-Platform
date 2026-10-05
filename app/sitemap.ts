import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/impact",
    "/stories",
    "/gallery",
    "/events",
    "/volunteer",
    "/donate",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const [programs, stories, events] = await Promise.all([
      prisma.program.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.story.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.event.findMany({ select: { slug: true, updatedAt: true } }),
    ]);

    const programRoutes = programs.map((p) => ({
      url: `${baseUrl}/programs/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const storyRoutes = stories.map((s) => ({
      url: `${baseUrl}/stories/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const eventRoutes = events.map((e) => ({
      url: `${baseUrl}/events/${e.slug}`,
      lastModified: e.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...programRoutes, ...storyRoutes, ...eventRoutes];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return staticRoutes;
  }
}
