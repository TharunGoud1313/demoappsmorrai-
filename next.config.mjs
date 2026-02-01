import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "secure.gravatar.com",
      "images.tmcnet.com",
      "amoga-login-template.vercel.app",
      "d8pvobupkiop1vno.public.blob.vercel-storage.com",
    ],
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
      },
    ],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  typescript:{
    ignoreBuildErrors:true
  },
  reactStrictMode: false,
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production",
  // },
};

const withPWAConfig = withPWA({
  dest: "public",
});

export default withNextIntl(nextConfig);
