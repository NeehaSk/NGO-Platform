"use server";

import prisma from "@/lib/prisma";
import { VolunteerSchema, ContactSchema } from "@/lib/validations";
import { sendVolunteerNotificationEmail, sendContactNotificationEmail } from "@/lib/resend";

export async function submitVolunteerAction(formData: unknown) {
  try {
    const validated = VolunteerSchema.safeParse(formData);

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Validation failed",
      };
    }

    const { name, email, phone, city, areaOfInterest, availability, message } = validated.data;

    const volunteer = await prisma.volunteer.create({
      data: {
        name,
        email,
        phone,
        city,
        areaOfInterest,
        availability,
        message,
        status: "PENDING",
      },
    });

    // Send email notification non-blockingly
    sendVolunteerNotificationEmail({
      name,
      email,
      phone,
      areaOfInterest,
      availability,
    }).catch((err) => console.error("Email trigger error:", err));

    return { success: true, id: volunteer.id };
  } catch (error) {
    console.error("Failed to submit volunteer application:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

export async function submitContactAction(formData: unknown) {
  try {
    const validated = ContactSchema.safeParse(formData);

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Validation failed",
      };
    }

    const { name, email, phone, subject, message } = validated.data;

    const contactMsg = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: "UNREAD",
      },
    });

    // Send notification non-blockingly
    sendContactNotificationEmail({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    }).catch((err) => console.error("Email trigger error:", err));

    return { success: true, id: contactMsg.id };
  } catch (error) {
    console.error("Failed to submit contact inquiry:", error);
    return { success: false, error: "An error occurred while sending your message. Please try again." };
  }
}
