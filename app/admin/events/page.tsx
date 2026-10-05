import React from "react";
import prisma from "@/lib/prisma";
import { AdminEventsManager } from "@/components/AdminEventsManager";

export const metadata = {
  title: "Manage Events | Admin CMS",
};

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let events: any[] = [];
  try {
    events = await prisma.event.findMany({
      orderBy: { eventDate: "asc" },
    });
  } catch (err) {
    console.warn("DB not connected yet:", err);
  }

  return <AdminEventsManager initialEvents={events} />;
}
