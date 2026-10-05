import React from "react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { updateVolunteerStatusAction } from "@/actions/admin-actions";

export const metadata = {
  title: "Volunteer Applications | Admin CMS",
};

export const dynamic = "force-dynamic";

export default async function AdminVolunteersPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let volunteers: any[] = [];
  try {
    volunteers = await prisma.volunteer.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB not connected yet:", err);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0F3E36]">
            Volunteer Applications
          </h1>
          <p className="text-xs text-[#64748B]">
            Roster of community members ready to support Vijayawada initiatives.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#0F3E36]">
          Total Applications: {volunteers.length}
        </span>
      </div>

      <Card className="p-6">
        {volunteers.length === 0 ? (
          <p className="text-sm text-[#64748B] py-8 text-center">
            No volunteer applications submitted yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Phone / City</TableHead>
                <TableHead>Area of Interest</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.map((vol) => (
                <TableRow key={vol.id}>
                  <TableCell>
                    <div className="font-semibold text-[#0F3E36]">{vol.name}</div>
                    <div className="text-xs text-[#64748B]">{vol.email}</div>
                    {vol.message && (
                      <p className="text-[11px] text-[#1E293B]/70 italic mt-1 line-clamp-1">
                        &ldquo;{vol.message}&rdquo;
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    <div>{vol.phone}</div>
                    <div className="text-[#64748B]">{vol.city}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="accent">{vol.areaOfInterest}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-[#1E293B]">{vol.availability}</TableCell>
                  <TableCell>
                    <form
                      action={async (formData) => {
                        "use server";
                        const newStatus = formData.get("status") as
                          | "PENDING"
                          | "REVIEWED"
                          | "APPROVED"
                          | "REJECTED";
                        await updateVolunteerStatusAction(vol.id, newStatus);
                      }}
                    >
                      <select
                        name="status"
                        defaultValue={vol.status}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => e.target.form.requestSubmit()}
                        className="text-xs border rounded px-2 py-1 bg-white cursor-pointer"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="REVIEWED">REVIEWED</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </form>
                  </TableCell>
                  <TableCell className="text-xs text-[#64748B]">
                    {formatDate(vol.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
