import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LangProvider } from "@/i18n/LangContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Image Tools - Free Online AI Image Processing",
  description:
    "Free online AI image processing tools. Remove background, compress images, convert formats, resize & crop, make ID photos, upscale with AI. All processing runs in your browser — nothing is uploaded to any server.",
  keywords: [
    "remove background from image",
    "image compressor",
    "image format converter",
    "ID photo maker",
    "AI image upscaler",
    "free online image tools",
    "background remover",
    "image resize online",
    "photo editor",
    "AI upscale image",
    "Real-ESRGAN",
    "image processing online",
  ],
  openGraph: {
    title: "AI Image Tools - Free Online AI Image Processing",
    description:
      "Remove background, compress, convert, resize, make ID photos, and upscale images with AI. All in your browser — nothing uploaded.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <LangProvider>{children}</LangProvider>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1145188294871152"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
