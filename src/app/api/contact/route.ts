import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

const DESTINATION_EMAIL = 'info@tesseractinfosystems.com';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, phone, company, message, service } = body;

    // 1. Strict Name validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Please enter your full name.' },
        { status: 400 }
      );
    }

    // 2. Strict Email validation: requires proper user, @, domain, and valid TLD with at least 2 chars
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address (e.g., name@domain.com).' },
        { status: 400 }
      );
    }

    // 3. Mobile Number validation: must contain at least 10 digits
    const cleanPhone = phone ? String(phone).replace(/[^0-9]/g, '') : '';
    if (!phone || cleanPhone.length < 10 || cleanPhone.length > 15) {
      return NextResponse.json(
        { error: 'Please provide a valid mobile number with at least 10 digits.' },
        { status: 400 }
      );
    }

    // 4. Message validation
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Please enter your message or project requirements.' },
        { status: 400 }
      );
    }

    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    console.log('=============================================');
    console.log(`[CONTACT FORM SUBMISSION] Destination: ${DESTINATION_EMAIL}`);
    console.log(`Timestamp: ${submissionTime}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Company: ${company || 'N/A'}`);
    console.log(`Service / Interest: ${service || 'General'}`);
    console.log(`Message: ${message}`);
    console.log('=============================================');

    // 1. Try sending via configured SMTP server if credentials exist
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      try {
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
          subject: `New Lead: ${name} [${phone}] (${service || 'General'})`,
          text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nMobile: ${phone}\nCompany: ${company || 'Not provided'}\nService: ${service || 'General'}\nDate: ${submissionTime}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
              <h2 style="color: #06b6d4; margin-top: 0;">New Contact Form Submission</h2>
              <p style="color: #475569; font-size: 14px;">A new project lead was submitted via the Tesseract InfoSystems website.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 140px;">Client Name:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Mobile / Phone:</td>
                  <td style="padding: 8px 0; color: #06b6d4; font-weight: bold;"><a href="tel:${phone}" style="color: #06b6d4;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email Address:</td>
                  <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #06b6d4;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Company / Org:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${company || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Service / Stack:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${service || 'General Inquiry'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Received At:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${submissionTime}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #06b6d4;">
                <h4 style="margin: 0 0 8px 0; color: #0f172a;">Message / Requirements:</h4>
                <p style="margin: 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">
                Delivered to <a href="mailto:${DESTINATION_EMAIL}" style="color: #94a3b8;">${DESTINATION_EMAIL}</a> via Tesseract Systems Engine
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
          success: true,
          delivered: true,
          method: 'smtp',
          message: `Inquiry successfully sent to ${DESTINATION_EMAIL}.`,
        });
      } catch (smtpErr) {
        console.error('SMTP Delivery error, proceeding to automated relay:', smtpErr);
      }
    }

    // 2. Automated dispatch via FormSubmit JSON relay directly to info@tesseractinfosystems.com
    try {
      const relayRes = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
        method: 'POST',
        signal: AbortSignal.timeout(6000),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://tesseractinfosystems.com',
          'Referer': 'https://tesseractinfosystems.com/contact',
          'User-Agent': 'Mozilla/5.0 (compatible; TesseractSystems/1.0)',
        },
        body: JSON.stringify({
          'Client Name': name,
          'Mobile Number': phone,
          'Email Address': email,
          'Company': company || 'Not provided',
          'Service / Interest': service || 'General Inquiry',
          'Message': message,
          _subject: `🚀 New Lead: ${name} [${phone}] - ${service || 'General'}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const relayData = await relayRes.json().catch(() => null);
      console.log('[FormSubmit Relay Response]:', relayData);

      if (relayRes.ok && (relayData?.success === 'true' || relayData?.success === true)) {
        return NextResponse.json({
          success: true,
          delivered: true,
          method: 'automated_dispatch',
          message: `Inquiry successfully delivered to ${DESTINATION_EMAIL}.`,
        });
      }

      if (relayData?.message && typeof relayData.message === 'string' && relayData.message.toLowerCase().includes('activate')) {
        console.warn('[FormSubmit Action Required]: Activation email pending for', DESTINATION_EMAIL);
        return NextResponse.json({
          success: true,
          delivered: false,
          method: 'activation_pending',
          message: `Inquiry recorded. Action Required: An activation link was sent to ${DESTINATION_EMAIL} by FormSubmit. Please check your inbox/spam to activate direct email delivery.`,
        });
      }
    } catch (relayErr: any) {
      console.warn('FormSubmit relay attempt finished/timed out:', relayErr?.message || relayErr);
    }

    // 3. Fallback confirmation
    return NextResponse.json({
      success: true,
      delivered: false,
      method: 'logged_to_server',
      message: `Inquiry recorded. If instant email delivery is delayed, please reach us directly at ${DESTINATION_EMAIL}.`,
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process inquiry submission.' },
      { status: 500 }
    );
  }
}
