import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Vijayawada Charitable Trust",
    default: "Vijayawada Charitable Trust | Empowering Communities in Andhra Pradesh",
  },
  description:
    "A dedicated charitable NGO & Trust in Vijayawada, Andhra Pradesh, transforming lives through education scholarships, preventive healthcare camps, and women skill empowerment.",
  keywords: [
    "Vijayawada NGO",
    "Charitable Trust Andhra Pradesh",
    "Donate Vijayawada",
    "Volunteer Krishna District",
    "80G Tax Deductible Donation",
    "Education scholarships Andhra Pradesh",
    "Community Health Camps",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Vijayawada Charitable Trust",
    title: "Vijayawada Charitable Trust | Empowering Communities in Andhra Pradesh",
    description:
      "A dedicated charitable NGO in Vijayawada, Andhra Pradesh, driving sustainable change in education, healthcare, and women livelihood.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E293B] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
