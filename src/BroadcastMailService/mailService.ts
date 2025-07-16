import nodemailer from 'nodemailer';

export interface MailOptions {
  smtpUser: string;
  smtpPass: string;
  from: string;
  to: string;
  subject: string;
  message: string;
}

export async function sendEmail({
  smtpUser,
  smtpPass,
  from,
  to,
  subject,
  message
}: MailOptions): Promise<{ success: boolean; error?: string }> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  try {
    await transporter.sendMail({ from, to, subject, text: message });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
