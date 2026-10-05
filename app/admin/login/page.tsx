"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "admin@charitabletrust-vijayawada.org",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setAuthError(null);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setAuthError("Invalid credentials provided. Please check email and password.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setAuthError("An unexpected error occurred during authentication.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {authError && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      <Input
        label="Staff / Administrator Email"
        id="email"
        type="email"
        placeholder="admin@charitabletrust-vijayawada.org"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        id="password"
        type="password"
        placeholder="••••••••••••"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full gap-2"
      >
        <Lock className="w-4 h-4" /> Secure Admin Login
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0F3E36] mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Website
        </Link>
        <div className="w-12 h-12 rounded-full bg-[#0F3E36] flex items-center justify-center text-white mx-auto text-lg font-bold border-2 border-[#D97736] shadow-sm">
          VCT
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F3E36]">
          Admin CMS Portal
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Vijayawada Charitable Trust Administrative Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-md sm:rounded-2xl sm:px-10 border border-[#E5DFD7] space-y-6">
          <Suspense fallback={<div className="text-center py-4 text-xs text-[#64748B]">Loading secure login...</div>}>
            <LoginForm />
          </Suspense>

          <div className="pt-2 border-t border-[#E5DFD7] text-center text-xs text-[#64748B] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authorized trust personnel access only.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
