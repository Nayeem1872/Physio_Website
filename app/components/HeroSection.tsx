import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, Star, Users } from "lucide-react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (banner && banner.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === banner.images.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [banner]);

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${BACKEND_URL}${imagePath}`;
  };

  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  // Default content if no banner
  const title =
    banner?.title || "Welcome to Reflex Physiotherapy & Rehab Center";
  const subtitle =
    banner?.subtitle ||
    "At Reflex, we are dedicated to helping you restore movement, relieve pain, and regain strength. Our team of expert physiotherapists and rehabilitation specialists provide personalized care using advanced techniques and state-of-the-art equipment. Whether you're recovering from an injury, surgery, or managing a chronic condition, we're here to support your journey to better health and wellness.";
  const images = banner?.images || ["/images/pic2.jpg"];

  return (
    <div>
      <section id="home" className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge
                  variant="outline"
                  className="border-[#2e3192]/50 bg-white py-1 px-3 shadow-sm"
                >
                  <Heart className="h-4 w-4 mr-2 text-[#2e3192]" />
                  Your journey to better movement starts here
                </Badge>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {title}
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {subtitle}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.div {...scaleOnHover}>
                  <Link href="/book">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192] hover:to-[#4c46a3] text-white px-8 py-3"
                    >
                      Book an Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div {...scaleOnHover}>
                  <Link href="/services">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#2e3192] text-[#2e3192] hover:bg-blue-50 px-8 py-3 bg-transparent"
                    >
                      Our Services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                {isLoading ? (
                  <div className="w-full h-[600px] bg-gray-200 rounded-2xl animate-pulse" />
                ) : (
                  <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-2xl">
                    <motion.img
                      key={currentImageIndex}
                      src={getImageUrl(images[currentImageIndex])}
                      alt="Reflex Physiotherapy"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                    {/* Image Indicators */}
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              idx === currentImageIndex
                                ? "bg-white w-6"
                                : "bg-white/50 w-2"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute z-20 -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Expert Care</p>
                    <p className="text-xs text-gray-600">Since 2024</p>
                  </div>
                </div>
              </motion.div>

              {/* Hotline Floating Card */}
              {contactInfo && contactInfo.phone && contactInfo.phone[0] && (
                <motion.a
                  href={`tel:${contactInfo.phone[0]}`}
                  className="absolute z-20 -bottom-4 -left-9 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="bg-[#2e3192] p-2 rounded-lg">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">24/7 Hotline</p>
                      <p className="text-xs text-[#2e3192] font-bold">
                        {contactInfo.phone[0]}
                      </p>
                    </div>
                  </div>
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
