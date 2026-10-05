"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ProgramSchema, StorySchema, EventSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";

// Check admin authentication helper
async function ensureAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized access. Admin authentication required.");
  }
}

// PROGRAMS CRUD
export async function createProgramAction(formData: unknown) {
  await ensureAdmin();
  const parsed = ProgramSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  await prisma.program.create({ data: parsed.data });
  revalidatePath("/admin/programs");
  revalidatePath("/programs");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProgramAction(id: string) {
  await ensureAdmin();
  await prisma.program.delete({ where: { id } });
  revalidatePath("/admin/programs");
  revalidatePath("/programs");
  revalidatePath("/");
  return { success: true };
}

// STORIES CRUD
export async function createStoryAction(formData: unknown) {
  await ensureAdmin();
  const parsed = StorySchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  await prisma.story.create({ data: parsed.data });
  revalidatePath("/admin/stories");
  revalidatePath("/stories");
  revalidatePath("/");
  return { success: true };
}

export async function deleteStoryAction(id: string) {
  await ensureAdmin();
  await prisma.story.delete({ where: { id } });
  revalidatePath("/admin/stories");
  revalidatePath("/stories");
  revalidatePath("/");
  return { success: true };
}

// EVENTS CRUD
export async function createEventAction(formData: unknown) {
  await ensureAdmin();
  const parsed = EventSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  await prisma.event.create({
    data: {
      ...parsed.data,
      eventDate: new Date(parsed.data.eventDate),
    },
  });
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return { success: true };
}

export async function deleteEventAction(id: string) {
  await ensureAdmin();
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return { success: true };
}

// GALLERY MANAGEMENT
export async function createGalleryImageAction({
  imageUrl,
  title,
  caption,
  category,
}: {
  imageUrl: string;
  title: string;
  caption?: string;
  category: string;
}) {
  await ensureAdmin();
  await prisma.galleryImage.create({
    data: { imageUrl, title, caption, category },
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function deleteGalleryImageAction(id: string) {
  await ensureAdmin();
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}

// VOLUNTEER STATUS WORKFLOW
export async function updateVolunteerStatusAction(id: string, status: "PENDING" | "REVIEWED" | "APPROVED" | "REJECTED") {
  await ensureAdmin();
  await prisma.volunteer.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/volunteers");
  return { success: true };
}

// CONTACT MESSAGE STATUS WORKFLOW
export async function updateMessageStatusAction(id: string, status: "READ" | "UNREAD" | "ARCHIVED") {
  await ensureAdmin();
  await prisma.contactMessage.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/messages");
  return { success: true };
}
