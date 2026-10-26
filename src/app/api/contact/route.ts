import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

const DESTINATION_EMAIL = 'info@tesseractinfosystems.com';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, company, message, service } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    console.log('=============================================');
    console.log(`[CONTACT FORM SUBMISSION] Destination: ${DESTINATION_EMAIL}`);
    console.log(`Timestamp: ${submissionTime}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Company: ${company || 'N/A'}`);
    console.log(`Service / Interest: ${service || 'General'}`);
    console.log(`Message: ${message}`);
    console.log('=============================================');

    // Check if SMTP environment variables are configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${name} (via Website)" <${smtpUser}>`,
        to: DESTINATION_EMAIL,
        replyTo: email,
        subject: `New Project Inquiry from ${name} (${service || 'General'})`,
        text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nService: ${service || 'General'}\nDate: ${submissionTime}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #06b6d4; margin-top: 0;">New Contact Form Submission</h2>
            <p style="color: #475569; font-size: 14px;">A new message was submitted via the Tesseract InfoSystems website.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #06b6d4;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Company:</td>
                <td style="padding: 8px 0; color: #0f172a;">${company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Service / Stack:</td>
                <td style="padding: 8px 0; color: #0f172a;">${service || 'General Inquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Received:</td>
                <td style="padding: 8px 0; color: #0f172a;">${submissionTime}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #06b6d4;">
              <h4 style="margin: 0 0 8px 0; color: #0f172a;">Message:</h4>
              <p style="margin: 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">
              This inquiry was sent to <a href="mailto:${DESTINATION_EMAIL}" style="color: #94a3b8;">${DESTINATION_EMAIL}</a> from tesseractinfosystems.com
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json({
        success: true,
        delivered: true,
        message: `Inquiry successfully sent to ${DESTINATION_EMAIL}.`,
      });
    }

    // If SMTP is not yet configured, return success with instructions and log it
    return NextResponse.json({
      success: true,
      delivered: false,
      targetEmail: DESTINATION_EMAIL,
      message: `Inquiry recorded for ${DESTINATION_EMAIL}. Configure SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local for automated email dispatch.`,
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process inquiry submission.' },
      { status: 500 }
    );
  }
}
