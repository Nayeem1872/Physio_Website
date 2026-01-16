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

export default function ReflexPhysiotherapyWebsite() {
  const [heroBanner, setHeroBanner] = useState<Banner | null>(null);
  const [aboutBanner, setAboutBanner] = useState<Banner | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
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
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection banner={heroBanner} isLoading={isLoading} />

      {/* Services Section */}
      <ServiceSection />

      {/* About Section */}
      <AboutSection banner={aboutBanner} isLoading={isLoading} />

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialSection testimonials={testimonials} isLoading={isLoading} />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
