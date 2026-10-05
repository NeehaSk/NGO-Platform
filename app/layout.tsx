import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Noor Basha Muslim Charitable Trust",
    default: "Noor Basha Muslim Charitable Trust | Vijayawada, Andhra Pradesh",
  },
  description:
    "Noor Basha Muslim Charitable Trust (నూర్ బాషా ముస్లిం చారిటబుల్ ట్రస్ట్), Edupugallu, Vijayawada. Empowering rural unemployed youth with free skill training (DDU-GKY / SEEDAP), education, hostel facility, and placements.",
  keywords: [
    "Noor Basha Muslim Charitable Trust",
    "నూర్ బాషా చారిటబుల్ ట్రస్ట్",
    "Noor Basha Bhavan Edupugallu",
    "DDU-GKY Free Training Vijayawada",
    "Aura Educational Society Edupugallu",
    "Vijayawada NGO",
    "Charitable Trust Andhra Pradesh",
    "Free Solar Technician Course Vijayawada",
    "Free Skill Development AP",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Noor Basha Muslim Charitable Trust",
    title: "Noor Basha Muslim Charitable Trust | Vijayawada, Andhra Pradesh",
    description:
      "Empowering youth with free residential skill training, education, and community welfare initiatives in Vijayawada & Andhra Pradesh.",
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
