"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DonationSchema, type DonationInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Heart, ShieldCheck, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { formatINR } from "@/lib/utils";

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export function DonationForm({ preselectedProgram }: { preselectedProgram?: string }) {
  const [selectedPreset, setSelectedPreset] = useState<number | "custom">(1000);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    donorName: string;
    amount: number;
    paymentId?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonationInput>({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
      amount: 1000,
      currency: "INR",
      anonymous: false,
      programId: preselectedProgram || "",
    },
  });

  const watchedAmount = watch("amount");

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePresetClick = (amt: number) => {
    setSelectedPreset(amt);
    setValue("amount", amt);
  };

  const onSubmit = async (data: DonationInput) => {
    setServerError(null);

    try {
      // 1. Create order on server
      const orderRes = await fetch("/api/donations/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initiate donation transaction.");
      }

      // Check if real Razorpay script is available
      if (typeof window.Razorpay === "function" && orderData.keyId !== "rzp_test_placeholder_key_id") {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Noor Basha Muslim Charitable Trust",
          description: "Charitable Trust Donation (80G Tax Deductible)",
          order_id: orderData.orderId,
          prefill: {
            name: data.donorName,
            email: data.email,
            contact: data.phone || "",
          },
          theme: {
            color: "#0F3E36",
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handler: async function (response: any) {
            // 2. Verify signature server-side
            const verifyRes = await fetch("/api/donations/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setSuccessData({
                donorName: data.donorName,
                amount: data.amount,
                paymentId: response.razorpay_payment_id,
              });
            } else {
              setServerError(verifyData.error || "Payment verification failed.");
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback for development / mock verification
        const verifyRes = await fetch("/api/donations/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpayOrderId: orderData.orderId,
            razorpayPaymentId: `pay_mock_${Date.now()}`,
            razorpaySignature: "mock_signature_dev",
          }),
        });
        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          setSuccessData({
            donorName: data.donorName,
            amount: data.amount,
            paymentId: `pay_mock_${Date.now().toString().slice(-6)}`,
          });
        } else {
          setServerError(verifyData.error || "Verification issue encountered.");
        }
      }
    } catch (err: unknown) {
      console.error("Donation submission error:", err);
      setServerError(err instanceof Error ? err.message : "An unexpected payment error occurred.");
    }
  };

  if (successData) {
    return (
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-emerald-300 shadow-md text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-3xl font-bold text-[#0F3E36]">
            Dhanyavadalu! Thank You, {successData.donorName}
          </h3>
          <p className="text-base text-[#1E293B]/80 max-w-lg mx-auto">
            Your generous donation of <strong>{formatINR(successData.amount)}</strong> has been successfully received by Noor Basha Muslim Charitable Trust.
          </p>
        </div>

        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] max-w-md mx-auto text-left text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[#64748B]">Transaction ID:</span>
            <span className="font-mono font-bold text-[#0F3E36]">{successData.paymentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#64748B]">80G Tax Exemption:</span>
            <span className="font-semibold text-emerald-700">Eligible (50% Deduction)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#64748B]">Receipt:</span>
            <span>Dispatched to your email</span>
          </div>
        </div>

        <Button variant="primary" onClick={() => setSuccessData(null)}>
          Make Another Contribution
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Preset Amount Grid */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-[#0F3E36]">
          Choose Your Contribution Amount (INR)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {PRESET_AMOUNTS.map((amt) => {
            const isSelected = selectedPreset === amt;
            return (
              <button
                type="button"
                key={amt}
                onClick={() => handlePresetClick(amt)}
                className={`py-3 px-2 rounded-lg text-sm font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#0F3E36] text-white border-[#0F3E36] shadow-xs"
                    : "bg-white text-[#1E293B] border-[#E5DFD7] hover:border-[#0F3E36]"
                }`}
              >
                ₹{amt.toLocaleString("en-IN")}
              </button>
            );
          })}
        </div>

        {/* Custom Amount Input */}
        <div className="pt-1">
          <Input
            id="amount"
            type="number"
            label="Or Enter Custom Amount (₹) *"
            placeholder="e.g. 7500"
            {...register("amount")}
            onChange={(e) => {
              setSelectedPreset("custom");
              setValue("amount", Number(e.target.value));
            }}
            error={errors.amount?.message}
          />
        </div>
      </div>

      {/* Donor Information */}
      <div className="space-y-4 pt-2 border-t border-[#E5DFD7]">
        <h4 className="text-sm font-bold text-[#0F3E36] uppercase tracking-wider">
          Donor & 80G Tax Details
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name (as per PAN) *"
            id="donorName"
            placeholder="e.g. Rajesh Kumar"
            {...register("donorName")}
            error={errors.donorName?.message}
          />

          <Input
            label="Email Address (for 80G digital receipt) *"
            id="email"
            type="email"
            placeholder="e.g. rajesh@example.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Mobile Number"
            id="phone"
            placeholder="e.g. 9848012345"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <Input
            label="PAN Number (Required for 80G Tax Rebate)"
            id="pan"
            placeholder="e.g. ABCDE1234F"
            {...register("pan")}
            error={errors.pan?.message}
          />
        </div>

        <Input
          label="Postal Address (for formal 80G receipt certificate)"
          id="address"
          placeholder="e.g. Flat 302, Green Meadows, Vijayawada, AP - 520010"
          {...register("address")}
          error={errors.address?.message}
        />

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="anonymous"
            {...register("anonymous")}
            className="w-4 h-4 rounded border-[#E5DFD7] text-[#0F3E36] focus:ring-[#0F3E36]"
          />
          <label htmlFor="anonymous" className="text-xs text-[#64748B]">
            Keep my name confidential on the public donors acknowledgment wall
          </label>
        </div>
      </div>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        isLoading={isSubmitting}
        className="w-full gap-2 shadow-md text-base"
      >
        <Heart className="w-5 h-5 fill-white" />
        Donate {watchedAmount ? formatINR(Number(watchedAmount)) : "Now"} with Razorpay
      </Button>

      <div className="pt-2 flex items-center justify-center gap-6 text-xs text-[#64748B]">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          256-Bit SSL Encrypted
        </span>
        <span className="flex items-center gap-1">
          <FileText className="w-4 h-4 text-[#D97736]" />
          Instant 80G Receipt
        </span>
      </div>
    </form>
  );
}
