import { NextResponse } from "next/server";
import { razorpayClient } from "@/lib/razorpay";
import prisma from "@/lib/prisma";
import { DonationSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = DonationSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.issues[0]?.message || "Invalid donation inputs" },
        { status: 400 }
      );
    }

    const { donorName, email, phone, pan, address, amount, currency, anonymous, programId, notes } =
      validated.data;

    let razorpayOrderId = `ord_mock_${Date.now()}`;

    // Create real Razorpay order if credentials are configured
    if (razorpayClient) {
      const order = await razorpayClient.orders.create({
        amount: Math.round(amount * 100), // convert to paise
        currency: currency || "INR",
        receipt: `rcpt_${Date.now().toString().slice(-8)}`,
        notes: {
          donorName,
          email,
          programId: programId || "General",
        },
      });
      razorpayOrderId = order.id;
    } else {
      console.warn("Razorpay credentials not fully configured. Using development order reference.");
    }

    // Persist pending donation in PostgreSQL source of truth
    const donation = await prisma.donation.create({
      data: {
        donorName,
        email,
        phone,
        pan,
        address,
        amount,
        currency,
        anonymous,
        programId,
        notes,
        razorpayOrderId,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: Math.round(amount * 100),
      currency,
      donationId: donation.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder_key_id",
    });
  } catch (error) {
    console.error("Order creation route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initialize payment transaction with server." },
      { status: 500 }
    );
  }
}
