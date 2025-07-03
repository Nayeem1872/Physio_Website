import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reflex Physiotherapy",
  description: "Reflex Physiotherapy",
  generator: "Reflex Physiotherapy",
  icons: {
    icon: "/images/logo2.jpg", // /public/favlogo4n.jpg
    shortcut: "/images/logo2.jpg", // /public/favlogo4n-16x16.jpg
    apple: "/images/logo2.jpg", // /public/apple-touch-icon.jpg
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
