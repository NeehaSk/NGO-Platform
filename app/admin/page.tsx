import React from "react";
import prisma from "@/lib/prisma";
import { formatINR, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { HeartHandshake, BookOpen, Users, Inbox, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let successfulDonationsTotal = { _sum: { amount: null as number | null } };
  let donationsCount = 0;
  let volunteersCount = 0;
  let programsCount = 0;
  let unreadMessagesCount = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentDonations: any[] = [];

  try {
    const [
      donationsTotalRes,
      donationsCountRes,
      volunteersCountRes,
      programsCountRes,
      unreadMessagesCountRes,
      recentDonationsRes,
    ] = await Promise.all([
      prisma.donation.aggregate({
        _sum: { amount: true },
        where: { status: "SUCCESS" },
      }),
      prisma.donation.count(),
      prisma.volunteer.count(),
      prisma.program.count(),
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
      prisma.donation.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    successfulDonationsTotal = donationsTotalRes;
    donationsCount = donationsCountRes;
    volunteersCount = volunteersCountRes;
    programsCount = programsCountRes;
    unreadMessagesCount = unreadMessagesCountRes;
    recentDonations = recentDonationsRes;
  } catch (err) {
    console.warn("Database not connected yet during build/startup:", err);
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F3E36]">
            Administrative Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Overview of donations, volunteer applications, and ongoing programs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/donations">
            <span className="text-xs font-semibold text-[#0F3E36] bg-[#EFEAE4] px-3 py-1.5 rounded-lg border border-[#E5DFD7] hover:bg-[#E5DFD7] transition-colors">
              Manage Donations
            </span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Collected Donations</span>
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F3E36]">
            {formatINR(successfulDonationsTotal._sum.amount || 0)}
          </div>
          <p className="text-[11px] text-[#64748B]">Across {donationsCount} total transactions</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Active Programs</span>
            <div className="p-2 rounded-lg bg-[#EFEAE4] text-[#0F3E36]">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F3E36]">{programsCount}</div>
          <p className="text-[11px] text-[#64748B]">Community initiatives running</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Volunteer Applications</span>
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F3E36]">{volunteersCount}</div>
          <p className="text-[11px] text-[#64748B]">Registered volunteers in roster</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Unread Messages</span>
            <div className="p-2 rounded-lg bg-orange-100 text-orange-800">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F3E36]">{unreadMessagesCount}</div>
          <p className="text-[11px] text-[#64748B]">Awaiting staff response</p>
        </Card>
      </div>

      {/* Recent Donations Table */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0F3E36]">Recent Contributions</h2>
            <p className="text-xs text-[#64748B]">Last 5 donation transactions recorded</p>
          </div>
          <Link
            href="/admin/donations"
            className="text-xs font-bold text-[#D97736] hover:underline flex items-center gap-1"
          >
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentDonations.length === 0 ? (
          <p className="text-sm text-[#64748B] py-6 text-center">
            No donations recorded in database yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Razorpay Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDonations.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <div className="font-semibold">{d.donorName}</div>
                    <div className="text-xs text-[#64748B]">{d.email}</div>
                  </TableCell>
                  <TableCell className="font-bold text-[#0F3E36]">{formatINR(d.amount)}</TableCell>
                  <TableCell className="font-mono text-xs text-[#64748B]">
                    {d.razorpayOrderId}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        d.status === "SUCCESS"
                          ? "success"
                          : d.status === "FAILED"
                          ? "warning"
                          : "default"
                      }
                    >
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-[#64748B]">{formatDate(d.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
