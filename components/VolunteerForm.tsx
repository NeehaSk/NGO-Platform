"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VolunteerSchema, type VolunteerInput } from "@/lib/validations";
import { submitVolunteerAction } from "@/actions/public-actions";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { CheckCircle, AlertCircle, HeartHandshake } from "lucide-react";

export function VolunteerForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VolunteerInput>({
    resolver: zodResolver(VolunteerSchema),
    defaultValues: {
      city: "Vijayawada",
      areaOfInterest: "Education & Tutoring",
      availability: "Weekends Only",
    },
  });

  const onSubmit = async (data: VolunteerInput) => {
    setServerError(null);
    const result = await submitVolunteerAction(data);
    if (result.success) {
      setSubmitted(true);
      reset();
    } else {
      setServerError(result.error || "Failed to submit application. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#0F3E36]">
          Thank You for Stepping Up!
        </h3>
        <p className="text-sm text-[#1E293B]/80 max-w-md mx-auto">
          Your volunteer/training inquiry has been received. Our Noor Basha Bhavan coordinator in Edupugallu will review your application and contact you shortly.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)} size="sm">
          Submit Another Response
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
          label="Full Name *"
          id="name"
          placeholder="e.g. Ramesh Varma"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          label="Email Address *"
          id="email"
          type="email"
          placeholder="e.g. ramesh@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Mobile Number (10 Digits) *"
          id="phone"
          placeholder="e.g. 9848012345"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          label="City / Region *"
          id="city"
          placeholder="e.g. Vijayawada, AP"
          {...register("city")}
          error={errors.city?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-1.5">
            Area of Interest *
          </label>
          <select
            {...register("areaOfInterest")}
            className="flex h-11 w-full rounded-lg border border-[#E5DFD7] bg-white px-3.5 py-2 text-sm text-[#1E293B] focus:border-[#0F3E36] focus:outline-none focus:ring-2 focus:ring-[#0F3E36]/20"
          >
            <option value="Education & Tutoring">Education & Tutoring</option>
            <option value="Health Camps & Medical">Health Camps & Medical</option>
            <option value="Women Skill Training">Women Skill Training</option>
            <option value="Event Coordination & Logistics">Event Coordination & Logistics</option>
            <option value="Social Media & Storytelling">Social Media & Storytelling</option>
            <option value="Disaster Relief & Food Drives">Disaster Relief & Food Drives</option>
          </select>
          {errors.areaOfInterest && (
            <p className="mt-1 text-xs text-red-600">{errors.areaOfInterest.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-1.5">
            Availability *
          </label>
          <select
            {...register("availability")}
            className="flex h-11 w-full rounded-lg border border-[#E5DFD7] bg-white px-3.5 py-2 text-sm text-[#1E293B] focus:border-[#0F3E36] focus:outline-none focus:ring-2 focus:ring-[#0F3E36]/20"
          >
            <option value="Weekends Only">Weekends Only</option>
            <option value="Weekdays">Weekdays</option>
            <option value="A few hours per week">A few hours per week</option>
            <option value="Flexible / On Call">Flexible / On Call</option>
          </select>
          {errors.availability && (
            <p className="mt-1 text-xs text-red-600">{errors.availability.message}</p>
          )}
        </div>
      </div>

      <Textarea
        label="Why would you like to volunteer with us? (Optional)"
        id="message"
        placeholder="Tell us a little about your skills, prior experience, or why community service matters to you..."
        rows={4}
        {...register("message")}
        error={errors.message?.message}
      />

      <Button
        type="submit"
        variant="accent"
        size="lg"
        isLoading={isSubmitting}
        className="w-full gap-2 shadow-md"
      >
        <HeartHandshake className="w-5 h-5" /> Submit Volunteer Application
      </Button>
    </form>
  );
}
