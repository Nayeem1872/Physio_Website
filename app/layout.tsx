import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reflex Physiotherapy",
  description: "Reflex Physiotherapy",
  generator: "Reflex Physiotherapy",
  icons: {
    icon: "/images/ico.jpg", // /public/favicon.png
    shortcut: "/images/ico.jpg", // /public/favicon-16x16.png
    apple: "/images/ico.jpg", // /public/apple-touch-icon.png
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
