import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey && !apiKey.startsWith("re_placeholder") ? new Resend(apiKey) : null;

const DEFAULT_FROM = process.env.EMAIL_FROM || "Vijayawada Charitable Trust <noreply@charitabletrust-vijayawada.org>";

export async function sendDonationConfirmationEmail({
  to,
  donorName,
  amount,
  orderId,
  paymentId,
  pan,
}: {
  to: string;
  donorName: string;
  amount: number;
  orderId: string;
  paymentId?: string;
  pan?: string;
}) {
  if (!resend) {
    console.log(`[Email Mock] Donation confirmation sent to ${to} for ₹${amount}`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: DEFAULT_FROM,
      to,
      subject: "Thank You for Your Generous Donation — Vijayawada Charitable Trust",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E293B; line-height: 1.6;">
          <div style="background-color: #0F3E36; color: #FAF8F5; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="margin: 0; font-size: 24px;">Vijayawada Charitable Trust</h2>
            <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 14px;">Serving communities across Andhra Pradesh</p>
          </div>
          <div style="background-color: #FAF8F5; padding: 32px; border: 1px solid #E5DFD7; border-radius: 0 0 8px 8px;">
            <h3 style="color: #0F3E36; margin-top: 0;">Dear ${donorName},</h3>
            <p>Thank you deeply for your support. Your gift creates tangible, lasting change for children, families, and communities in Vijayawada and surrounding regions.</p>
            
            <div style="background-color: #FFFFFF; border: 1px solid #E5DFD7; border-radius: 6px; padding: 20px; margin: 20px 0;">
              <h4 style="margin: 0 0 12px 0; color: #0F3E36; font-size: 16px;">Donation Receipt Summary</h4>
              <p style="margin: 4px 0;"><strong>Contribution Amount:</strong> ₹${amount.toLocaleString("en-IN")}</p>
              <p style="margin: 4px 0;"><strong>Transaction Reference:</strong> ${paymentId || orderId}</p>
              ${pan ? `<p style="margin: 4px 0;"><strong>Donor PAN (80G Eligible):</strong> ${pan}</p>` : ""}
              <p style="margin: 4px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString("en-IN")}</p>
            </div>
            
            <p style="font-size: 13px; color: #64748B;">This digital receipt acknowledges your voluntary contribution. Please retain this email for your financial and tax records.</p>
            <p style="margin-top: 24px; font-weight: bold; color: #0F3E36;">With heartfelt gratitude,<br/>Board of Trustees<br/>Vijayawada Charitable Trust</p>
          </div>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send donation confirmation email:", error);
    return { success: false, error };
  }
}

export async function sendVolunteerNotificationEmail({
  name,
  email,
  phone,
  areaOfInterest,
  availability,
}: {
  name: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  availability: string;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;
  if (!resend || !adminEmail) {
    console.log(`[Email Mock] Volunteer application from ${name} (${areaOfInterest}) logged.`);
    return { success: true, mocked: true };
  }

  try {
    await resend.emails.send({
      from: DEFAULT_FROM,
      to: adminEmail,
      subject: `New Volunteer Application: ${name} (${areaOfInterest})`,
      html: `
        <h3>New Volunteer Application Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Area of Interest:</strong> ${areaOfInterest}</p>
        <p><strong>Availability:</strong> ${availability}</p>
        <p>Please review and manage this application in the Admin Dashboard.</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send volunteer notification email:", error);
    return { success: false, error };
  }
}

export async function sendContactNotificationEmail({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;
  if (!resend || !adminEmail) {
    console.log(`[Email Mock] Contact inquiry from ${name}: "${subject}" logged.`);
    return { success: true, mocked: true };
  }

  try {
    await resend.emails.send({
      from: DEFAULT_FROM,
      to: adminEmail,
      subject: `NGO Website Inquiry: ${subject}`,
      html: `
        <h3>New Contact Message Received</h3>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="background-color: #f5f5f5; padding: 16px; border-radius: 4px;">
          <p style="white-space: pre-wrap; margin: 0;">${message}</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
    return { success: false, error };
  }
}
