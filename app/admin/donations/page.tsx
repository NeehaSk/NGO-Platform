import React from "react";
import prisma from "@/lib/prisma";
import { formatINR, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Donation Ledger | Admin CMS",
};

export const dynamic = "force-dynamic";

export default async function AdminDonationsPage() {
  let donations: Array<{
    id: string;
    donorName: string;
    email: string;
    phone: string | null;
    pan: string | null;
    amount: number;
    razorpayOrderId: string;
    razorpayPaymentId: string | null;
    status: string;
    createdAt: Date;
  }> = [];

  try {
    donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Database connection notice on admin donations:", err);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0F3E36]">Donation Ledger</h1>
          <p className="text-xs text-[#64748B]">
            All transactions, Razorpay IDs, and 80G tax receipt records.
          </p>
        </div>
        <div className="text-sm font-semibold text-[#0F3E36]">
          Total Transactions: {donations.length}
        </div>
      </div>

      <Card className="p-6">
        {donations.length === 0 ? (
          <div className="text-center py-12 text-[#64748B] space-y-2">
            <HeartHandshake className="w-10 h-10 mx-auto opacity-40 text-[#0F3E36]" />
            <p>No donation transactions found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor Name & Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>PAN (80G)</TableHead>
                <TableHead>Razorpay Payment ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-semibold">{item.donorName}</div>
                    <div className="text-xs text-[#64748B]">{item.email}</div>
                    {item.phone && <div className="text-[11px] text-[#64748B]">{item.phone}</div>}
                  </TableCell>
                  <TableCell className="font-bold text-[#0F3E36]">
                    {formatINR(item.amount)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-[#1E293B]">
                    {item.pan || <span className="text-[#94A3B8]">—</span>}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-[#64748B]">
                    {item.razorpayPaymentId || item.razorpayOrderId}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "SUCCESS"
                          ? "success"
                          : item.status === "FAILED"
                          ? "warning"
                          : "default"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-[#64748B]">
                    {formatDate(item.createdAt)}
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
