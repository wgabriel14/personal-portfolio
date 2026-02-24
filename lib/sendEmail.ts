import { Resend } from "resend";
import type { ContactFormData } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData) {
  const toEmail = process.env.CONTACT_EMAIL_TO || "reyesmanriquewg@gmail.com";
  const fromEmail =
    process.env.CONTACT_EMAIL_FROM ||
    "Portfolio Contact <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: data.email,
    subject: `Portfolio Contact: ${data.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #0a0a0a; margin-bottom: 4px;">New Portfolio Contact</h2>
        <p style="color: #666; font-size: 14px; margin-bottom: 24px;">Someone reached out via your portfolio contact form.</p>

        <div style="background: #fff; padding: 20px; border-radius: 6px; border: 1px solid #e5e5e5; margin-bottom: 16px;">
          <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${data.name}</p>
          <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #00d4ff;">${data.email}</a></p>
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 6px; border: 1px solid #e5e5e5;">
          <p style="margin: 0 0 8px 0;"><strong>Message:</strong></p>
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 24px; text-align: center;">
          Sent from williamsreyes.dev portfolio
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
