import React from "react";
import prisma from "@/lib/prisma";
import { AdminProgramsManager } from "@/components/AdminProgramsManager";

export const metadata = {
  title: "Manage Programs | Admin CMS",
};

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let programs: any[] = [];
  try {
    programs = await prisma.program.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB not connected yet:", err);
  }

  return <AdminProgramsManager initialPrograms={programs} />;
}
