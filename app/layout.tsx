import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reflex Physiotherapy | Expert Rehabilitation & Care",
  description: "Reflex Physiotherapy offers expert rehabilitation services, specialized physical therapy, and personalized care to help you recover faster and live pain-free.",
  generator: "Reflex Physiotherapy",
  applicationName: "Reflex Physiotherapy",
  keywords: ["Physiotherapy", "Rehabilitation", "Physical Therapy", "Reflex Physio", "Pain Relief", "Sports Injury"],
  authors: [{ name: "Reflex Physiotherapy" }],
  creator: "Reflex Physiotherapy",
  publisher: "Reflex Physiotherapy",
  icons: {
    icon: [
      { url: "/images/logo-circle.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-circle.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/images/logo-circle.png",
    apple: "/images/logo-circle.png",
  },
  openGraph: {
    title: "Reflex Physiotherapy | Expert Rehabilitation & Care",
    description: "Personalized physical therapy and rehabilitation services to get you back to your best self.",
    url: "https://reflexphysiotherapy.com", // Replace with actual URL if known
    siteName: "Reflex Physiotherapy",
    images: [
      {
        url: "/images/logo-circle.png",
        width: 1024,
        height: 1024,
        alt: "Reflex Physiotherapy HD Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reflex Physiotherapy",
    description: "Expert Rehabilitation & Care",
    images: ["/images/logo-circle.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
