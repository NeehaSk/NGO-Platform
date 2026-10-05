import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import prisma from "@/lib/prisma";
import { sendDonationConfirmationEmail } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    if (!verifyWebhookSignature({ body: rawBody, signature })) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    if (event === "payment.captured" || event === "order.paid") {
      const payment = payload.payload?.payment?.entity;
      const orderId = payment?.order_id;
      const paymentId = payment?.id;

      if (orderId) {
        // Idempotent update
        const donation = await prisma.donation.findUnique({
          where: { razorpayOrderId: orderId },
        });

        if (donation && donation.status !== "SUCCESS") {
          const updated = await prisma.donation.update({
            where: { razorpayOrderId: orderId },
            data: {
              status: "SUCCESS",
              razorpayPaymentId: paymentId,
            },
          });

          sendDonationConfirmationEmail({
            to: updated.email,
            donorName: updated.donorName,
            amount: updated.amount,
            orderId: updated.razorpayOrderId,
            paymentId: updated.razorpayPaymentId || undefined,
            pan: updated.pan || undefined,
          }).catch(console.error);
        }
      }
    } else if (event === "payment.failed") {
      const payment = payload.payload?.payment?.entity;
      const orderId = payment?.order_id;
      if (orderId) {
        await prisma.donation.updateMany({
          where: { razorpayOrderId: orderId },
          data: { status: "FAILED" },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
