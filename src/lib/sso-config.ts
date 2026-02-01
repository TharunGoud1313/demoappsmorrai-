import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { BASE_URL, NEXT_PUBLIC_API_KEY } from "@/constants/envConfig";
import { middlewareAPI } from "./auth-middleware";

export const ssoProviders = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
  LinkedInProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  }),
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials:any) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      try {
        const response = await middlewareAPI({
          email: credentials.email,
          password: credentials.password,})
          console.log("response--",response)
          if(response){
            return response
          }
          return null
      } catch (error) {
        return null;
      }
    },
  }),
  CredentialsProvider({
    id:"mobile-otp",
    name: "Mobile OTP",
    credentials: {
      mobile: {label: "Mobile Number",type: "text"},
      otp: {label: "OTP", type: "text"},
      sessionId: {label: "Session ID", type: "text"}
    },
    async authorize(credentials: any) {
      if (!credentials?.mobile || !credentials?.otp) {
        return null;
      }

      try {
        // Verify OTP
        const otpResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/otp/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: credentials.sessionId, otp: credentials.otp }),
        });
        
        const otpData = await otpResponse.json();

        // Check if OTP is verified
        if (otpData.verified === true) {
          // Check if user exists in the database
          const userResponse = await fetch(`${BASE_URL}/user_catalog`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${NEXT_PUBLIC_API_KEY}`,
            },
          });
          
          const users = await userResponse.json();
          const user = users.find((user:any) => user.user_mobile === credentials.mobile);

          if (user) {
            // Return user data to establish a session
            return { id: user.id, name: `${user.first_name} ${user.last_name}`, mobile: user.user_mobile };
          } else {
            return null;
          }
        }
        return null;
      } catch (error) {
        console.error("Error during OTP login:", error);
        return null;
      }
    },
  })
];

export const showProviderButtons = {
  google: true,
  github: true,
  linkedin: true,
}
