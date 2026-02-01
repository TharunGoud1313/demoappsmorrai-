import { BASE_URL } from "@/constants/envConfig";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
      const { token, newPassword } = await req.json();
      console.log("token----",token)

      // Fetch user by reset token
      const response = await fetch(`${BASE_URL}/user_catalog?reset_token=eq.${token}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
      });
      const users = await response.json();

      // Verify token and expiry
      if (!users || users.length === 0 || new Date(users[0].reset_token_expiry) < new Date()) {
          return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
      }

      const email = users[0].user_email;

      // Update password and clear reset token fields
      await fetch(`${BASE_URL}/user_catalog?user_email=eq.${email}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({ password: newPassword, reset_token: null, reset_token_expiry: null }),
      });

      return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
      console.error("Password reset error:", error);
      return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}
