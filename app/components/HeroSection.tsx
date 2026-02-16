import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, Star, Users, PhoneCall, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "@/lib/config";

interface Banner {
  _id: string;
  section: string;
  images: string[];
  title: string;
  subtitle: string;
  isActive: boolean;
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

interface HeroSectionProps {
  banner: Banner | null;
  isLoading: boolean;
  contactInfo: ContactInfo | null;
}

const HeroSection = ({ banner, isLoading, contactInfo }: HeroSectionProps) => {
  const images = banner?.images || ["/images/pic2.jpg"];

  const getImageUrl = (imagePath: string) => {
    if (imagePath?.startsWith("http")) return imagePath;
    return `${BACKEND_URL}${imagePath}`;
  };

  const title = banner?.title || "Chiropractor At Your Service";
  const subtitle = banner?.subtitle || "Expert physiotherapy care tailored to your needs. We help you recover faster and move better with advanced techniques and personalized treatment plans.";

  return (
    <div className="relative bg-[#f6f5ff] pt-12 lg:pt-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-20 max-w-2xl px-4 lg:px-0"
          >
            <h1 className="text-5xl lg:text-7xl text-[#1a1c3d] leading-[1.1] mb-6">
              {title}
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              {subtitle}
            </p>
            <Link href="/about">
              <Button
                variant="outline"
                className="rounded-lg border-[#2e3192] text-[#2e3192] hover:bg-[#2e3192] hover:text-white px-8 py-6 text-base font-medium transition-all"
              >
                Read More
              </Button>
            </Link>
          </motion.div>

          {/* Right Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[450px] lg:h-[600px] w-full flex items-center justify-center lg:justify-end"
          >
            {/* Decorative Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] lg:w-[70%] h-[80%] lg:h-[90%] bg-gradient-to-br from-[#4c99e9] to-[#2bd7cc] rounded-[60px] transform rotate-12 -z-10 shadow-2xl overflow-hidden hidden sm:block">
              <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>

            {/* Main Doctors Image */}
            <div className="relative h-full w-full flex items-end justify-center z-10">
              <img
                src={getImageUrl(images[0])}
                alt="Health Professionals"
                className="h-full w-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating Circular Element 1 - Top Right */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-5 lg:top-10 right-0 lg:right-[10%] w-24 h-24 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden z-20 hidden sm:block"
            >
              <img
                src={getImageUrl(images[1] || images[0])}
                alt="Clinic Specialist"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating Circular Element 2 - Middle Right */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-16 lg:bottom-28 right-0 lg:right-[5%] w-20 h-20 lg:w-36 lg:h-36 rounded-full border-4 border-white shadow-xl overflow-hidden z-20 hidden sm:block"
            >
              <img
                src={getImageUrl(images[2] || images[0])}
                alt="Rehab Session"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Booking Widget */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-8 lg:mt-[-50px] z-30 flex justify-center pb-16"
        >
          <div className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] p-8 lg:p-12 w-full max-w-6xl border border-gray-100/50">
            <h3 className="text-2xl lg:text-4xl text-[#1a1c3d] text-center mb-10">
              Book an appointment today
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-[#f8f9fc] border-none rounded-2xl px-6 py-5 text-gray-700 focus:ring-2 focus:ring-[#2e3192]/10 transition-all outline-none text-base"
                />
              </div>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#f8f9fc] border-none rounded-2xl px-6 py-5 text-gray-700 focus:ring-2 focus:ring-[#2e3192]/10 transition-all outline-none text-base"
                />
              </div>
              <div className="relative group">
                <input
                  type="date"
                  className="w-full bg-[#f8f9fc] border-none rounded-2xl px-6 py-5 text-gray-700 focus:ring-2 focus:ring-[#2e3192]/10 transition-all outline-none text-base cursor-pointer"
                />
              </div>
              <div className="relative group">
                <select className="w-full bg-[#f8f9fc] border-none rounded-2xl px-6 py-5 text-gray-700 focus:ring-2 focus:ring-[#2e3192]/10 transition-all outline-none appearance-none cursor-pointer text-base">
                  <option value="">Services</option>
                  <option value="physiotherapy">Physiotherapy</option>
                  <option value="chiropractic">Chiropractic</option>
                  <option value="rehab">Rehabilitation</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <Button className="w-full bg-[#2e3192] hover:bg-[#1a1c3d] text-white rounded-2xl py-8 text-lg font-semibold shadow-xl shadow-[#2e3192]/20 transition-all active:scale-95">
                Book Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/50 rounded-full blur-[120px] -z-20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-50/40 rounded-full blur-[120px] -z-20" />
    </div>
  );
};

export default HeroSection;
