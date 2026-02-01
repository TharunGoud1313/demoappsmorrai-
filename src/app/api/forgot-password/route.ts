import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { BASE_URL } from "@/constants/envConfig";

const transporter = nodemailer.createTransport({
  host: "mail.morr.biz",
  port: 465,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);

    const requestOptions = {
      method: "GET",
      headers: header,
    };

    const response = await fetch(
      `${BASE_URL}/user_catalog?user_email=eq.${email}`,
      requestOptions
    );
    const users = await response.json();

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60000).toISOString();

    const patchResponse = await fetch(
      `${BASE_URL}/user_catalog?user_email=eq.${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({
          reset_token: resetToken,
          reset_token_expiry: resetTokenExpiry,
        }),
      }
    );

    if (!patchResponse.ok) {
      return NextResponse.json(
        { error: "Failed to store reset token" },
        { status: 500 }
      );
    }

    // Create reset link
    const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/reset-password/${resetToken}`;

    // Send email
    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    return NextResponse.json({ message: "Reset link sent successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset" },
      { status: 500 }
    );
  }
}
