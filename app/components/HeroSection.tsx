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
    banner?.title || "Restore Your Mobility, Relive Your Life";
  const subtitle =
    banner?.subtitle ||
    "Expert physiotherapy care tailored to your needs. We help you recover faster and move better with advanced techniques and personalized treatment plans.";
  const images = banner?.images || ["/images/pic2.jpg"];

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-green-100/40 rounded-full blur-[100px]"
        />
      </div>

      <section id="home" className="relative z-10 py-12 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge
                  className="bg-blue-50 text-[#2e3192] border-blue-100 py-1.5 px-4 rounded-full flex items-center w-fit shadow-sm gap-2"
                >
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-xs sm:text-sm tracking-wide uppercase">Premier Physiotherapy Center</span>
                </Badge>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#1a1c3d] leading-[1.1]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {title.split(' ').map((word, i) => (
                    <span key={i} className="inline-block mr-2 lg:mr-3">
                      {word === 'Mobility' || word === 'Life' ? (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2e3192] to-[#4c46a3]">
                          {word}
                        </span>
                      ) : word}
                    </span>
                  ))}
                </motion.h1>

                <motion.p
                  className="text-lg lg:text-xl text-gray-500 leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {subtitle}
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.div {...scaleOnHover}>
                  <Link href="/book">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-[#2e3192] hover:bg-[#1a1c3d] text-white px-10 py-7 rounded-2xl text-lg font-semibold shadow-xl shadow-blue-200 transition-all duration-300 group"
                    >
                      Book Appointment
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div {...scaleOnHover}>
                  <Link href="/services">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-gray-200 text-gray-700 hover:border-[#2e3192] hover:text-[#2e3192] px-10 py-7 rounded-2xl text-lg font-semibold bg-white/50 backdrop-blur-sm transition-all duration-300"
                    >
                      Explore Services
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>



            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:ml-auto w-full mt-8 lg:mt-0"
            >
              <div className="relative z-10 w-full">
                {isLoading ? (
                  <div className="w-full aspect-video sm:aspect-video lg:aspect-[4/3] bg-gray-100 rounded-[2.5rem] animate-pulse" />
                ) : (
                  <div className="relative group perspective-1000">
                    <div className="relative w-full aspect-video sm:aspect-video lg:aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(46,49,146,0.15)] ring-1 ring-black/5 transition-all duration-700">
                      <AnimatePresence mode="wait">
                        <div key={currentImageIndex} className="relative w-full h-full bg-gray-50 flex items-center justify-center overflow-hidden">
                          {/* Blurred Background to fill gaps for wide/tall photos */}
                          <motion.img
                            src={getImageUrl(images[currentImageIndex])}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                          />

                          {/* Main Image - Now using object-contain to ENSURE no one is cut off */}
                          <motion.img
                            src={getImageUrl(images[currentImageIndex])}
                            alt="Reflex Physiotherapy Team"
                            className="relative z-10 w-full h-full object-contain"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                          />
                        </div>
                      </AnimatePresence>

                      {/* Subtitle/Caption Overlay - subtle */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none z-20" />

                      {/* Image Indicators */}
                      {images.length > 1 && (
                        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
                          {images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${idx === currentImageIndex
                                ? "bg-white w-6 sm:w-8 shadow-sm"
                                : "bg-white/40 w-2 sm:w-3 hover:bg-white/60"
                                }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quality badge element - Hidden on very small screens, shown from sm up */}
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 md:-right-10 bg-white p-3 sm:p-5 rounded-2xl sm:rounded-3xl shadow-xl z-20 border border-gray-50 flex flex-col items-center gap-1 scale-90 sm:scale-100"
                    >
                      <div className="bg-green-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl mb-1">
                        <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                      </div>
                      <p className="font-bold text-gray-900 text-[10px] sm:text-sm">Certified</p>
                      <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-bold">Specialists</p>
                    </motion.div>

                    {/* Hotline Floating Card - Optimized for mobile */}
                    {contactInfo && contactInfo.phone && contactInfo.phone[0] && (
                      <motion.a
                        href={`tel:${contactInfo.phone[0]}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="absolute -bottom-6 -left-2 sm:-bottom-8 sm:-left-6 md:-left-12 bg-white/95 backdrop-blur-sm p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer z-20 border border-gray-100 flex items-center gap-3 sm:gap-4 group/card scale-90 sm:scale-100"
                      >
                        <div className="bg-[#2e3192] p-2.5 sm:p-4 rounded-lg sm:rounded-xl shadow-lg shadow-blue-200 group-hover/card:scale-110 transition-transform">
                          <PhoneCall className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-[8px] sm:text-xs text-gray-400 uppercase tracking-widest">Call for support</p>
                          <p className="text-sm sm:text-lg font-bold text-[#1a1c3d] tracking-tight group-hover/card:text-[#2e3192] transition-colors">{contactInfo.phone[0]}</p>
                        </div>
                      </motion.a>
                    )}
                  </div>
                )}
              </div>

              {/* Abstract decorative shapes behind the image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none opacity-50">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#2e3192]/5">
                  <path d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.7C85.1,-30,89.3,-15,88.7,-0.3C88.1,14.3,82.8,28.6,74.5,41.4C66.2,54.2,54.9,65.5,41.4,73.1C27.9,80.7,14,84.6,-0.6,85.6C-15.1,86.6,-30.3,84.7,-43.8,77.1C57.3,69.5,-69.2,56.1,-77.1,42.5C-85,28.9,-88.9,15.1,-88.1,1.5C-87.3,-12.1,-81.8,-25.4,-73.4,-37.8C-65,-50.2,-53.6,-61.7,-40.5,-69C-27.4,-76.4,-13.7,-79.6,0.6,-80.7C15,-81.7,29.9,-80.6,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
