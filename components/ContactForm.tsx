"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, type ContactInput } from "@/lib/validations";
import { submitContactAction } from "@/actions/public-actions";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setServerError(null);
    const result = await submitContactAction(data);
    if (result.success) {
      setSubmitted(true);
      reset();
    } else {
      setServerError(result.error || "Failed to send message. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#0F3E36]">Message Delivered</h3>
        <p className="text-sm text-[#1E293B]/80 max-w-md mx-auto">
          Thank you for reaching out to Noor Basha Muslim Charitable Trust. Our administrative committee will review your message and respond promptly.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)} size="sm">
          Send Another Note
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name *"
          id="name"
          placeholder="e.g. Smt. Sunitha Rao"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          label="Email Address *"
          id="email"
          type="email"
          placeholder="e.g. sunitha@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone Number (Optional)"
          id="phone"
          placeholder="e.g. +91 98480 12345"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          label="Subject *"
          id="subject"
          placeholder="e.g. CSR Collaboration / General Inquiry"
          {...register("subject")}
          error={errors.subject?.message}
        />
      </div>

      <Textarea
        label="Message / Inquiry Details *"
        id="message"
        placeholder="Please describe how we can assist or collaborate with you..."
        rows={5}
        {...register("message")}
        error={errors.message?.message}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full gap-2 shadow-md"
      >
        <Send className="w-4 h-4" /> Send Message to Trust Office
      </Button>
    </form>
  );
}
