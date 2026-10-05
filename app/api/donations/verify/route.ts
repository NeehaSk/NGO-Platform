import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import prisma from "@/lib/prisma";
import { sendDonationConfirmationEmail } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

    if (!razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json(
        { success: false, error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    // Server-side cryptographic HMAC-SHA256 signature verification
    const isSignatureValid = verifyRazorpaySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature || "",
    });

    const isMock = razorpayOrderId.startsWith("ord_mock_");

    if (!isSignatureValid && !isMock) {
      // Mark as failed in DB
      await prisma.donation.updateMany({
        where: { razorpayOrderId },
        data: {
          status: "FAILED",
          razorpayPaymentId,
          razorpaySignature,
        },
      });

      return NextResponse.json(
        { success: false, error: "Payment signature verification failed. Untrusted response." },
        { status: 400 }
      );
    }

    // Idempotent database update: source of truth
    const donation = await prisma.donation.update({
      where: { razorpayOrderId },
      data: {
        status: "SUCCESS",
        razorpayPaymentId,
        razorpaySignature: razorpaySignature || "mock_signature_dev",
      },
    });

    // Update program raised amount if linked
    if (donation.programId) {
      await prisma.program.updateMany({
        where: { slug: donation.programId },
        data: {
          raisedAmount: {
            increment: donation.amount,
          },
        },
      });
    }

    // Trigger transactional 80G tax receipt email
    sendDonationConfirmationEmail({
      to: donation.email,
      donorName: donation.donorName,
      amount: donation.amount,
      orderId: donation.razorpayOrderId,
      paymentId: donation.razorpayPaymentId || undefined,
      pan: donation.pan || undefined,
    }).catch((err) => console.error("Receipt email error:", err));

    return NextResponse.json({
      success: true,
      donation: {
        id: donation.id,
        amount: donation.amount,
        donorName: donation.donorName,
        razorpayPaymentId: donation.razorpayPaymentId,
      },
    });
  } catch (error) {
    console.error("Donation verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal error processing payment verification." },
      { status: 500 }
    );
  }
}
