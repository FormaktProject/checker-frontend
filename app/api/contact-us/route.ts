import { EmailTemplate } from "@/app/static-data/templateemail";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"
import {render} from '@react-email/render'
export async function POST(req: Request) {
  // Parse the request body
  const body = await req.json();
  const { fullName, email, subject, message } = body;

  // Validate required fields
  if (!fullName || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Create OVH SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., 'ssl0.ovh.net'
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER, // Your OVH email: contact@yourdomain.com
        pass: process.env.SMTP_PASS, // Your OVH email password
      },
    });

    // Verify SMTP connection (optional but recommended)
    await transporter.verify();

    // Render the React email template to HTML
    const emailHtml =await  render(
      EmailTemplate({
        fullName,
        email,
        message,
        subject,
      })
    );

    // Configure email options
    const mailOptions = {
      from: `"${process.env.BUSINESS_NAME || 'VerifyPlace'}" <${process.env.SMTP_USER}>`, // Must be your authenticated OVH email
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Your receiving email
      replyTo: email, // User's email - so you can reply directly
      subject: `[VerifyPlace Contact] ${subject}`,
      html: emailHtml,
      // Optional: Plain text fallback
      text: `
      Name: ${fullName}
      Email: ${email}
      Subject: ${subject}

      Message:
      ${message}
            `,
          };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}