import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Activity,
  Users2,
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getPrograms,
  getStories,
  getEvents,
  getGalleryImages,
  getImpactStatistics,
} from "@/services/public-data";
import { formatINR, formatDate } from "@/lib/utils";

export default async function HomePage() {
  const [programs, stories, events, gallery, stats] = await Promise.all([
    getPrograms(true),
    getStories(2),
    getEvents(true),
    getGalleryImages(),
    getImpactStatistics(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0F3E36] text-[#FAF8F5] py-16 lg:py-24 overflow-hidden">
        {/* Subtle geometric backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D97736_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#134E48] blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Urgent Bilingual Banner for New Batch */}
          <div className="mb-8 p-4 rounded-xl bg-[#D97736]/20 border border-[#D97736]/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              <span className="font-bold text-[#D97736] uppercase tracking-wide mr-2">📢 నూతన బ్యాచ్ ప్రకటన / Admissions Open:</span>
              <span>నిరుద్యోగ యువతీ యువకులకు DDU-GKY & SEEDAP ద్వారా 90 రోజుల ఉచిత నైపుణ్య శిక్షణ, ఉచిత హాస్టల్, భోజనం & 100% ఉద్యోగ అవకాశం!</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href="tel:9182065618" className="text-xs bg-[#D97736] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#c26428] transition-colors">
                📞 Call: 9182065618
              </a>
              <Link href="/events" className="text-xs text-white underline hover:text-[#D97736]">
                వివరాలు చూడండి
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#134E48] text-[#D97736] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-emerald-800">
                <Sparkles className="w-4 h-4" />
                నూర్ బాషా భవన్ • ఈడుపుగల్లు, విజయవాడ
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Noor Basha Muslim Charitable Trust
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#D97736]">
                నూర్ బాషా (ముస్లిం) చారిటబుల్ ట్రస్ట్
              </p>

              <p className="text-base sm:text-lg text-[#FAF8F5]/85 max-w-2xl leading-relaxed">
                గ్రామీణ నిరుద్యోగ యువతకు ఉచిత నైపుణ్య శిక్షణ, ఉచిత హాస్టల్, భోజనం మరియు ఉపాధి కల్పన. Serving rural youth and underprivileged families in Vijayawada, Krishna district & Andhra Pradesh.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/programs/ddu-gky-skill-development">
                  <Button variant="accent" size="lg" className="gap-2 w-full sm:w-auto shadow-md">
                    <GraduationCap className="w-5 h-5" />
                    Apply For Free Training (ఉచిత శిక్షణ)
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white w-full sm:w-auto"
                  >
                    Contact Helpline
                  </Button>
                </Link>
              </div>

              {/* Trust markers */}
              <div className="pt-4 border-t border-emerald-900/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#FAF8F5]/70">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  DDU-GKY / SEEDAP Partner
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  100% Free Hostel & Food
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#D97736]" />
                  Govt Certificate & Placements
                </span>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border-2 border-emerald-800/80 shadow-2xl bg-[#134E48]">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1000&auto=format&fit=crop"
                    alt="Solar lighting assemble and skill workshop"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3E36] via-transparent to-transparent" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#D97736] font-bold">
                      AURA EDUCATIONAL SOCIETY & TRUST
                    </span>
                    <Badge variant="accent">Admissions Open</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white">90-Day DDU-GKY Skill Program</h3>
                  <p className="text-sm text-[#FAF8F5]/80">
                    Solar Lighting Assemble, Computers & Typing, Spoken English & Communication Skills. Free food, hostel, and campus selection!
                  </p>
                  <div className="text-xs text-[#FAF8F5]/70">
                    📍 <strong>Venue:</strong> D.No. 5-7, Noor Basha Bhavan, Edupugallu, Vijayawada
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-300">
                      Eligible: SSC Pass • 18-35 Yrs
                    </span>
                    <Link
                      href="/programs/ddu-gky-skill-development"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#D97736] hover:text-white transition-colors"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME IMPACT COUNTERS */}
      <section className="bg-[#FAF8F5] py-12 border-b border-[#E5DFD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl border border-[#E5DFD7] shadow-xs space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F3E36] font-serif">
                {stats.peopleHelped.toLocaleString("en-IN")}+
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#64748B]">People Directly Assisted</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-[#E5DFD7] shadow-xs space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F3E36] font-serif">
                {stats.communitiesReached}
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#64748B]">Habitations & Wards Reached</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-[#E5DFD7] shadow-xs space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F3E36] font-serif">
                {stats.volunteersActive}+
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#64748B]">Active Field Volunteers</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-[#E5DFD7] shadow-xs space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#D97736] font-serif">
                {stats.yearsOfService} Years
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#64748B]">Serving Andhra Pradesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE TRUST TEASER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="accent">నూర్ బాషా ట్రస్ట్ & భవన్</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F3E36] tracking-tight">
                Noor Basha Muslim Charitable Trust (నూర్ బాషా భవన్)
              </h2>
              <p className="text-base text-[#1E293B]/80 leading-relaxed">
                విజయవాడ సమీపంలోని ఈడుపుగల్లు లో నిర్మించిన నూర్ బాషా భవన్ లో గ్రామీణ నిరుద్యోగ యువతీ యువకులకు ఉచిత శిక్షణ, ఉచిత హాస్టల్, భోజనం కల్పించి ఉద్యోగావకాశాలు అందిస్తున్నాము. Established as a dedicated public charitable trust in Krishna district, Andhra Pradesh.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0F3E36] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#1E293B]">
                    <strong>Free 90-Day DDU-GKY Training:</strong> Solar lighting assemble, computers & typing, spoken English and communication skills.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0F3E36] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#1E293B]">
                    <strong>Free Residential & 100% Placement:</strong> Free breakfast, meals, hostel stay, and campus selections upon completion.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0F3E36] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#1E293B]">
                    <strong>కుల, మతాల విభేదం లేకుండా:</strong> అర్హత కలిగిన అందరికీ సమాన అవకాశం (Open to SSC pass youth aged 18 to 35).
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <Link href="/about">
                  <Button variant="secondary" className="gap-2">
                    Learn More About Our Governance <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden shadow-sm h-52 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop"
                    alt="Health outreach"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
                  <Activity className="w-6 h-6 text-[#0F3E36] mb-2" />
                  <h4 className="font-bold text-[#0F3E36] text-sm">Health Camps</h4>
                  <p className="text-xs text-[#64748B]">Fortnightly geriatric & diagnostic screenings</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-4 bg-[#0F3E36] text-white rounded-xl">
                  <GraduationCap className="w-6 h-6 text-[#D97736] mb-2" />
                  <h4 className="font-bold text-white text-sm">Vidya Scholarships</h4>
                  <p className="text-xs text-[#FAF8F5]/80">Empowering first-generation scholars</p>
                </div>
                <div className="rounded-xl overflow-hidden shadow-sm h-52 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                    alt="Women empowerment"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROGRAMS */}
      <section className="py-20 bg-[#FAF8F5] border-y border-[#E5DFD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <Badge variant="accent">Our Interventions</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F3E36] tracking-tight">
                Key Community Programs
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-xl">
                Every project addresses a root systemic challenge with measurable goals, structured budgets, and public accountability.
              </p>
            </div>
            <Link href="/programs">
              <Button variant="outline" className="gap-2">
                View All Programs <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const progress =
                program.targetAmount && program.raisedAmount
                  ? Math.min(100, Math.round((program.raisedAmount / program.targetAmount) * 100))
                  : 65;

              return (
                <Card key={program.id} className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[16/10] relative w-full overflow-hidden bg-slate-100">
                    <Image
                      src={program.coverImage}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="default" className="bg-[#0F3E36]/90 backdrop-blur-xs">
                        Active Initiative
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="space-y-2 flex-1">
                    <CardTitle className="line-clamp-1">{program.title}</CardTitle>
                    <CardDescription className="line-clamp-2 leading-relaxed">
                      {program.shortDescription}
                    </CardDescription>

                    {/* Progress Bar */}
                    {program.targetAmount && (
                      <div className="pt-3 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#0F3E36]">
                            Raised: {formatINR(program.raisedAmount || 0)}
                          </span>
                          <span className="text-[#64748B]">{progress}%</span>
                        </div>
                        <div className="w-full bg-[#EFEAE4] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#D97736] h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-[#64748B]">
                          <span>Goal: {formatINR(program.targetAmount)}</span>
                          <span>{program.beneficiaries || 100}+ Beneficiaries</span>
                        </div>
                      </div>
                    )}
                  </CardHeader>

                  <CardFooter className="pt-2 border-t border-[#E5DFD7]/60 flex gap-2">
                    <Link href={`/programs/${program.slug}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                    <Link href={`/donate?program=${program.slug}`} className="flex-1">
                      <Button variant="accent" size="sm" className="w-full gap-1">
                        <Heart className="w-3.5 h-3.5 fill-white" /> Support
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BENEFICIARY STORIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <Badge variant="accent">Impact In Action</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F3E36]">
              Real Stories of Hope & Transformation
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Meet the children, women, and families whose lives took a positive turn thanks to collective kindness and transparent support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col sm:flex-row bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="sm:w-5/12 aspect-[4/3] sm:aspect-auto relative min-h-[200px]">
                  <Image src={story.image} alt={story.title} fill className="object-cover" />
                </div>
                <div className="sm:w-7/12 p-6 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-xs text-[#D97736] font-semibold tracking-wide uppercase">
                      Beneficiary Story
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#0F3E36] group-hover:text-[#134E48] transition-colors leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-sm text-[#1E293B]/80 line-clamp-3 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href={`/stories/${story.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F3E36] hover:text-[#D97736] transition-colors"
                    >
                      Read Full Story <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. UPCOMING EVENTS & FIELD DRIVES */}
      {events.length > 0 && (
        <section className="py-16 bg-[#FAF8F5] border-t border-[#E5DFD7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div>
                <Badge variant="accent">Get Involved Locally</Badge>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F3E36] mt-1">
                  Upcoming Community Drives & Admissions
                </h2>
              </div>
              <Link href="/events">
                <Button variant="outline" size="sm">
                  All Events
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-xl border border-[#E5DFD7] flex flex-col sm:flex-row gap-5 items-start"
                >
                  <div className="w-16 h-16 rounded-lg bg-[#0F3E36] text-[#FAF8F5] flex flex-col items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#D97736] mb-1" />
                    <span className="text-xs font-bold uppercase">
                      {new Date(event.eventDate).toLocaleString("en-IN", { month: "short" })}
                    </span>
                    <span className="text-sm font-extrabold leading-none">
                      {new Date(event.eventDate).getDate()}
                    </span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-bold text-[#0F3E36] text-lg leading-tight">{event.title}</h3>
                    <p className="text-xs text-[#64748B] flex items-center gap-1">
                      <span>📍 {event.location}</span>
                    </p>
                    <p className="text-sm text-[#1E293B]/80 line-clamp-2">{event.description}</p>
                    <div className="pt-2">
                      <Link
                        href={`/events/${event.slug}`}
                        className="text-xs font-bold text-[#D97736] hover:underline"
                      >
                        Event Details & Contact Numbers →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. DUAL ACTION CTA: VOLUNTEER & DONATE */}
      <section className="py-20 bg-[#0F3E36] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Donate Box */}
            <div className="bg-[#134E48] p-8 sm:p-10 rounded-2xl border border-emerald-800 space-y-5">
              <div className="w-12 h-12 rounded-full bg-[#D97736] flex items-center justify-center text-white">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">Support Noor Basha Charitable Trust</h3>
              <p className="text-sm text-[#FAF8F5]/85 leading-relaxed">
                Your contributions directly support free hostel facilities, food, technical training kits for unemployed youth, education aid, and medical relief camps at Edupugallu.
              </p>
              <div className="pt-2">
                <Link href="/donate">
                  <Button variant="accent" size="lg" className="gap-2 w-full sm:w-auto">
                    Donate Online with Instant 80G Receipt
                  </Button>
                </Link>
              </div>
            </div>

            {/* Volunteer Box */}
            <div className="bg-[#134E48]/60 p-8 sm:p-10 rounded-2xl border border-emerald-800/80 space-y-5">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Users2 className="w-6 h-6 text-[#D97736]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">Join Our Volunteer Movement</h3>
              <p className="text-sm text-[#FAF8F5]/85 leading-relaxed">
                Whether you have 2 hours on a weekend or specialized medical, teaching, or administrative skills, your hands can touch lives across Vijayawada.
              </p>
              <div className="pt-2">
                <Link href="/volunteer">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    Apply to Volunteer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
