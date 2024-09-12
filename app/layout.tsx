import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Keywords AI SEO Description Generator",
  description:
    "AI SEO Description Generator: Create a concise, compelling, and SEO-friendly description for a blog post based on its content.",
  icons: "https://www.keywordsai.co/logo.svg",
  openGraph: {
    type: "website",
    title: "",
    description:
      "AI SEO Description Generator: Create a concise, compelling, and SEO-friendly description for a blog post based on its content.",
    url: "https://keywordsai.co",
    siteName: "Keywords AI",
    images: [
      {
        url: "https://keywordsai-static.s3.amazonaws.com/social_media_images/social_image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@keywordsai",
    title: "Keywords AI",
    images: [
      "https://keywordsai-static.s3.amazonaws.com/social_media_images/social_image.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <Head>
        <link rel="icon" href="/logo.svg" type="image/svg" sizes="26x26" />
        <Head>
          <link rel="icon" href="/icon.svg" type="image/svg" sizes="26x26" />
        </Head>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
