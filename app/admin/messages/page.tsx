import React from "react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { updateMessageStatusAction } from "@/actions/admin-actions";

export const metadata = {
  title: "Inquiries & Messages | Admin CMS",
};

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let messages: any[] = [];
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB not connected yet:", err);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0F3E36]">Public Inquiries</h1>
          <p className="text-xs text-[#64748B]">Messages received via the public contact form.</p>
        </div>
        <span className="text-xs font-semibold text-[#0F3E36]">
          Total Inquiries: {messages.length}
        </span>
      </div>

      <Card className="p-6">
        {messages.length === 0 ? (
          <p className="text-sm text-[#64748B] py-8 text-center">No messages received yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender</TableHead>
                <TableHead>Subject & Content</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell>
                    <div className="font-semibold text-[#0F3E36]">{msg.name}</div>
                    <div className="text-xs text-[#64748B]">{msg.email}</div>
                    {msg.phone && <div className="text-[11px] text-[#64748B]">{msg.phone}</div>}
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="font-bold text-xs text-[#0F3E36]">{msg.subject}</div>
                    <p className="text-xs text-[#1E293B]/80 mt-1 line-clamp-3 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </TableCell>
                  <TableCell>
                    <form
                      action={async (formData) => {
                        "use server";
                        const newStatus = formData.get("status") as "READ" | "UNREAD" | "ARCHIVED";
                        await updateMessageStatusAction(msg.id, newStatus);
                      }}
                    >
                      <select
                        name="status"
                        defaultValue={msg.status}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => e.target.form.requestSubmit()}
                        className="text-xs border rounded px-2 py-1 bg-white cursor-pointer"
                      >
                        <option value="UNREAD">UNREAD</option>
                        <option value="READ">READ</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </form>
                  </TableCell>
                  <TableCell className="text-xs text-[#64748B]">
                    {formatDate(msg.createdAt)}
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
