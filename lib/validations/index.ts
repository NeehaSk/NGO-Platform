import { z } from "zod";

export const DonationSchema = z.object({
  donorName: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  pan: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  amount: z.coerce.number().min(100, "Minimum donation amount is ₹100").max(1000000, "For donations exceeding ₹10,00,000, please contact us directly"),
  currency: z.string().default("INR"),
  anonymous: z.boolean().default(false),
  programId: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

export type DonationInput = z.infer<typeof DonationSchema>;

export const VolunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid 10-digit mobile number"),
  city: z.string().min(2, "City name is required").default("Vijayawada"),
  areaOfInterest: z.enum([
    "Education & Tutoring",
    "Health Camps & Medical",
    "Women Skill Training",
    "Event Coordination & Logistics",
    "Social Media & Storytelling",
    "Disaster Relief & Food Drives",
  ]),
  availability: z.enum(["Weekends Only", "Weekdays", "A few hours per week", "Flexible / On Call"]),
  message: z.string().optional().or(z.literal("")),
});

export type VolunteerInput = z.infer<typeof VolunteerSchema>;

export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message cannot exceed 2000 characters"),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid admin email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const ProgramSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug is required"),
  shortDescription: z.string().min(10, "Short description is required"),
  description: z.string().min(20, "Detailed description is required"),
  coverImage: z.string().url("Valid cover image URL is required"),
  targetAmount: z.coerce.number().optional().nullable(),
  raisedAmount: z.coerce.number().optional().nullable(),
  beneficiaries: z.coerce.number().optional().nullable(),
  status: z.enum(["ACTIVE", "ARCHIVED", "DRAFT"]).default("ACTIVE"),
  featured: z.boolean().default(false),
});

export type ProgramInput = z.infer<typeof ProgramSchema>;

export const StorySchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().min(10, "Excerpt is required"),
  content: z.string().min(20, "Content is required"),
  image: z.string().url("Valid image URL is required"),
  author: z.string().default("Trust Field Team"),
  published: z.boolean().default(true),
});

export type StoryInput = z.infer<typeof StorySchema>;

export const EventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  description: z.string().min(20, "Description is required"),
  image: z.string().url("Valid image URL is required"),
  location: z.string().min(3, "Location is required").default("Vijayawada, Andhra Pradesh"),
  eventDate: z.string().min(5, "Event date is required"),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]).default("UPCOMING"),
});

export type EventInput = z.infer<typeof EventSchema>;
