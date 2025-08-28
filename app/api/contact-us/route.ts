import { EmailTemplate } from "@/app/static-data/templateemail";
import { NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY as string);
export async function POST(req:Request){
      // Parse the request body
    const body = await req.json();
    const {
      fullName,
      email,
      subject,
      message,
    } = body;
    try{
        const { data, error } = await resend.emails.send({
      from: "VerifyPlace <onboarding@resend.dev>",
      to: ["contact@checkerist.com"],
      subject: `[VerifyPlace Contact] ${subject}`,
      react:EmailTemplate({
        fullName,
        email,
        message,
        subject,
      }),
      // Optional: Add reply-to address
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: "Email sent successfully",
        data 
      },
      { status: 200 }
    );
    }catch(error){
      console.log("Error", error)
      return NextResponse.json({
        success:false,
        message:"Somthing went wrong"
      })
    }
}