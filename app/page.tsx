"use client";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServiceSection from "./components/ServiceSection";
import AboutSection from "./components/AboutSection";
import TeamSection from "./components/TeamSection";
import TestimonialSection from "./components/TestimonialSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function ReflexPhysiotherapyWebsite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServiceSection />

      {/* About Section */}
      <AboutSection />

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
