import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reflex Physiotherapy - Expert Physical Therapy in Uttara, Dhaka",
  description:
    "Reflex Physiotherapy provides expert rehabilitation and physical therapy services in Uttara, Dhaka. Specialized treatment for sports injuries, post-surgical recovery, and chronic pain management.",
  generator: "Reflex Physiotherapy",
  applicationName: "Reflex Physiotherapy",
  keywords: [
    "physiotherapy",
    "physical therapy",
    "rehabilitation",
    "Uttara",
    "Dhaka",
    "sports injury treatment",
    "post-surgical rehabilitation",
    "pain relief",
    "physiotherapist",
    "manual therapy",
    "electrotherapy",
    "dry needling",
  ],
  authors: [{ name: "Reflex Physiotherapy" }],
  creator: "Reflex Physiotherapy",
  publisher: "Reflex Physiotherapy",
  icons: {
    icon: "/images/logo6.png",
    shortcut: "/images/logo5.png",
    apple: "/images/logo5.png",
  },
  openGraph: {
    title: "Reflex Physiotherapy - Expert Physical Therapy in Uttara",
    description:
      "Professional physiotherapy and rehabilitation services in Uttara, Dhaka. Expert care for sports injuries, post-surgical recovery, and pain management.",
    url: "https://reflexphysiotherapy.com",
    siteName: "Reflex Physiotherapy",
    images: [
      {
        url: "/images/logo6.png",
        alt: "Reflex Physiotherapy Logo",
      },
    ],
    locale: "en_BD",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Reflex Physiotherapy - Physical Therapy in Uttara",
    description:
      "Expert rehabilitation and physiotherapy services in Uttara, Dhaka",
    images: ["/images/logo6.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://reflexphysiotherapy.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2e3192" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Reflex Physiotherapy",
              description:
                "Expert physiotherapy and rehabilitation center in Uttara, Dhaka",
              url: "https://reflexphysiotherapy.com",
              telephone: "+880-1684-522924",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Uttara",
                addressLocality: "Dhaka",
                addressCountry: "BD",
              },
              areaServed: ["Uttara", "Dhaka", "Bangladesh"],
              priceRange: "$$",
              image: "/images/logo6.png",
              sameAs: [
                "https://www.facebook.com/reflexphysiotherapy",
                "https://www.instagram.com/reflexphysiotherapy",
              ],
              serviceType: [
                "Physical Therapy",
                "Rehabilitation",
                "Sports Injury Treatment",
                "Post-Surgical Rehabilitation",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
