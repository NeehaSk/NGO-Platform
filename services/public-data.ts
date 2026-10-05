import prisma from "@/lib/prisma";
import {
  FALLBACK_PROGRAMS,
  FALLBACK_STORIES,
  FALLBACK_EVENTS,
  FALLBACK_GALLERY,
} from "./mock-data";

export async function getPrograms(featuredOnly = false) {
  try {
    const res = await prisma.program.findMany({
      where: featuredOnly ? { featured: true, status: "ACTIVE" } : { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    });
    if (res && res.length > 0) return res;
    return featuredOnly ? FALLBACK_PROGRAMS.filter((p) => p.featured) : FALLBACK_PROGRAMS;
  } catch (error) {
    console.warn("Database unavailable. Using default NGO programs.");
    return featuredOnly ? FALLBACK_PROGRAMS.filter((p) => p.featured) : FALLBACK_PROGRAMS;
  }
}

export async function getProgramBySlug(slug: string) {
  try {
    const prog = await prisma.program.findUnique({
      where: { slug },
    });
    if (prog) return prog;
    return FALLBACK_PROGRAMS.find((p) => p.slug === slug) || null;
  } catch (error) {
    return FALLBACK_PROGRAMS.find((p) => p.slug === slug) || null;
  }
}

export async function getStories(limit?: number) {
  try {
    const res = await prisma.story.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
    if (res && res.length > 0) return res;
    return limit ? FALLBACK_STORIES.slice(0, limit) : FALLBACK_STORIES;
  } catch (error) {
    return limit ? FALLBACK_STORIES.slice(0, limit) : FALLBACK_STORIES;
  }
}

export async function getStoryBySlug(slug: string) {
  try {
    const story = await prisma.story.findUnique({
      where: { slug },
    });
    if (story) return story;
    return FALLBACK_STORIES.find((s) => s.slug === slug) || null;
  } catch (error) {
    return FALLBACK_STORIES.find((s) => s.slug === slug) || null;
  }
}

export async function getEvents(upcomingOnly = false) {
  try {
    const res = await prisma.event.findMany({
      where: upcomingOnly ? { status: "UPCOMING" } : undefined,
      orderBy: { eventDate: "asc" },
    });
    if (res && res.length > 0) return res;
    return upcomingOnly
      ? FALLBACK_EVENTS.filter((e) => e.status === "UPCOMING")
      : FALLBACK_EVENTS;
  } catch (error) {
    return upcomingOnly
      ? FALLBACK_EVENTS.filter((e) => e.status === "UPCOMING")
      : FALLBACK_EVENTS;
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const evt = await prisma.event.findUnique({
      where: { slug },
    });
    if (evt) return evt;
    return FALLBACK_EVENTS.find((e) => e.slug === slug) || null;
  } catch (error) {
    return FALLBACK_EVENTS.find((e) => e.slug === slug) || null;
  }
}

export async function getGalleryImages(category?: string) {
  try {
    const res = await prisma.galleryImage.findMany({
      where: category && category !== "All" ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    });
    if (res && res.length > 0) return res;
    return category && category !== "All"
      ? FALLBACK_GALLERY.filter((g) => g.category.toLowerCase() === category.toLowerCase())
      : FALLBACK_GALLERY;
  } catch (error) {
    return category && category !== "All"
      ? FALLBACK_GALLERY.filter((g) => g.category.toLowerCase() === category.toLowerCase())
      : FALLBACK_GALLERY;
  }
}

export async function getImpactStatistics() {
  try {
    const totalDonations = await prisma.donation.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" },
    });

    const volunteersCount = await prisma.volunteer.count();
    const programsCount = await prisma.program.count({ where: { status: "ACTIVE" } });

    return {
      peopleHelped: 8500,
      communitiesReached: 42,
      volunteersActive: volunteersCount > 0 ? volunteersCount : 120,
      programsActive: programsCount > 0 ? programsCount : 6,
      fundsMobilized: totalDonations._sum.amount || 1565000,
      yearsOfService: 8,
    };
  } catch (error) {
    return {
      peopleHelped: 8500,
      communitiesReached: 42,
      volunteersActive: 120,
      programsActive: 6,
      fundsMobilized: 1565000,
      yearsOfService: 8,
    };
  }
}
