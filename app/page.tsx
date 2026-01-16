"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServiceSection from "./components/ServiceSection";
import AboutSection from "./components/AboutSection";
import TeamSection from "./components/TeamSection";
import TestimonialSection from "./components/TestimonialSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import LeadershipQuoteSection from "./components/LeadershipQuoteSection";
import { motion } from "framer-motion";

interface Banner {
  _id: string;
  section: string;
  images: string[];
  title: string;
  subtitle: string;
  isActive: boolean;
}

interface Testimonial {
  _id: string;
  profileMedia: string;
  mediaType: string;
  fullName: string;
  role: string;
  rating: number;
  testimonial: string;
  service: string;
  date: string;
  published: boolean;
}

interface ContactInfo {
  _id: string;
  phone: string[];
  email: string[];
  address: string[];
  whatsapp: string[];
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
}

interface Leadership {
  _id: string;
  name: string;
  position: string;
  role: "chairman" | "ceo" | "other";
  quote: string;
  image: string;
  badge: string;
  order: number;
  published: boolean;
}

export default function ReflexPhysiotherapyWebsite() {
  const [heroBanner, setHeroBanner] = useState<Banner | null>(null);
  const [aboutBanner, setAboutBanner] = useState<Banner | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [leadership, setLeadership] = useState<Leadership[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch banners
        const bannersResponse = await fetch(
          "http://localhost:5000/api/banners?isActive=true"
        );
        if (bannersResponse.ok) {
          const banners: Banner[] = await bannersResponse.json();
          const hero = banners.find((b) => b.section === "hero");
          const about = banners.find((b) => b.section === "about");
          setHeroBanner(hero || null);
          setAboutBanner(about || null);
        }

        // Fetch testimonials
        const testimonialsResponse = await fetch(
          "http://localhost:5000/api/testimonials"
        );
        if (testimonialsResponse.ok) {
          const data = await testimonialsResponse.json();
          setTestimonials(data.testimonials || []);
        }

        // Fetch contact info
        const contactResponse = await fetch(
          "http://localhost:5000/api/contact-info"
        );
        if (contactResponse.ok) {
          const data = await contactResponse.json();
          setContactInfo(data);
        }

        // Fetch leadership
        const leadershipResponse = await fetch(
          "http://localhost:5000/api/leadership"
        );
        if (leadershipResponse.ok) {
          const data = await leadershipResponse.json();
          if (data.leadership && data.leadership.length > 0) {
            // Sort by order and filter for chairman and ceo
            const sortedLeadership = data.leadership
              .filter(
                (l: Leadership) => l.role === "chairman" || l.role === "ceo"
              )
              .sort((a: Leadership, b: Leadership) => a.order - b.order);
            setLeadership(sortedLeadership);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get chairman and CEO from leadership
  const chairman = leadership.find((l) => l.role === "chairman");
  const ceo = leadership.find((l) => l.role === "ceo");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        banner={heroBanner}
        isLoading={isLoading}
        contactInfo={contactInfo}
      />

      {/* Services Section */}
      <ServiceSection />

      {/* Chairman Quote - Image Left, Quote Right */}
      {chairman && (
        <LeadershipQuoteSection
          leadership={chairman}
          imagePosition="left"
          index={0}
        />
      )}

      {/* About Section */}
      <AboutSection banner={aboutBanner} isLoading={isLoading} />

      {/* CEO Quote - Image Right, Quote Left */}
      {ceo && (
        <LeadershipQuoteSection
          leadership={ceo}
          imagePosition="right"
          index={1}
        />
      )}

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialSection testimonials={testimonials} isLoading={isLoading} />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {/* WhatsApp Button */}
        {contactInfo && contactInfo.whatsapp && contactInfo.whatsapp[0] && (
          <motion.a
            href={`https://wa.me/${contactInfo.whatsapp[0].replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-colors"
          >
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </motion.a>
        )}

        {/* Facebook Messenger Button */}
        {contactInfo && contactInfo.facebook && (
          <motion.a
            href={contactInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl transition-colors"
          >
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
            </svg>
          </motion.a>
        )}
      </div>
    </div>
  );
}
