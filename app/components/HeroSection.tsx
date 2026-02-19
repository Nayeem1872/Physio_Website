import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, Star, Users, PhoneCall, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
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
  banners: Banner[];
  isLoading: boolean;
  contactInfo: ContactInfo | null;
}

const HeroSection = ({ banners, isLoading, contactInfo }: HeroSectionProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Flatten banners so each image becomes its own slide with its parent banner's text
  const slides = useMemo(() => {
    if (!banners || banners.length === 0) {
      return [{
        _id: "default",
        bannerId: "default",
        title: "Care You Can Trust, Results You Can See",
        subtitle: "Expert physiotherapy care tailored to your needs. We help you recover faster and move better with advanced techniques.",
        image: "/images/pic2.jpg"
      }];
    }

    return banners.flatMap((banner: Banner) =>
      banner.images.map((img: string, index: number) => ({
        _id: `${banner._id}-${index}`,
        bannerId: banner._id,
        title: banner.title,
        subtitle: banner.subtitle,
        image: img
      }))
    );
  }, [banners]);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/images/pic2.jpg";
    if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
      return imagePath;
    }
    const baseUrl = BACKEND_URL || "";
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentSlideIndex];
  const slideImage = currentSlide.image;

  return (
    <div className="relative min-h-[90vh] lg:min-h-[85vh] bg-[#f8faff] overflow-hidden flex flex-col justify-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#2e3192]/5 -skew-x-12 translate-x-1/4 -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Left Side - Animated Content */}
          <div className="relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.bannerId}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="max-w-xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-[#2e3192]/20 bg-[#2e3192]/5 text-[#2e3192] font-bold uppercase text-[10px] tracking-[0.2em]">
                    <Sparkles className="w-3 h-3 mr-2" />
                    Premium Medical Care
                  </Badge>
                </motion.div>

                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-[#1a1c3d] leading-[1.05] mb-8 tracking-tighter">
                  {currentSlide.title}
                </h1>

                <p className="text-gray-500 text-lg lg:text-xl leading-relaxed mb-10 font-medium opacity-80">
                  {currentSlide.subtitle}
                </p>

                <div className="flex flex-wrap gap-5">
                  <Link href="/about">
                    <Button
                      className="rounded-2xl bg-[#2e3192] text-white hover:bg-[#1a1c3d] px-10 py-7 text-lg font-bold shadow-2xl shadow-[#2e3192]/30 transition-all hover:translate-y-[-4px] active:scale-95 group"
                    >
                      Our Services
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button
                      variant="outline"
                      className="rounded-2xl border-2 border-[#2e3192]/20 text-[#2e3192] hover:bg-[#2e3192]/5 px-10 py-7 text-lg font-bold transition-all hover:translate-y-[-4px]"
                    >
                      Book Visit
                    </Button>
                  </Link>
                </div>

                <div className="mt-16 flex items-center gap-6 border-t border-gray-200/60 pt-8">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <p className="text-xs text-[#1a1c3d] font-black uppercase tracking-widest mt-1">10k+ Successful Treatments</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Visuals */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: -2 }}
                transition={{ duration: 1, ease: "anticipate" }}
                className="relative z-10 w-full aspect-video group"
              >
                {/* Image Container with Dynamic Border */}
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm p-2 rounded-3xl shadow-[0_50px_100px_-20px_rgba(46,49,146,0.15)] ring-1 ring-black/5">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative bg-gray-50/50">
                    <img
                      src={getImageUrl(slideImage)}
                      alt={currentSlide.title}
                      className="w-full h-full object-contain transition-transform duration-[2000ms] group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/pic2.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2e3192]/20 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Floating Stat Widget */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 z-20 flex items-center gap-5"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                    <Heart className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Patient Trust</p>
                    <p className="text-2xl font-black text-[#1a1c3d]">99.9%</p>
                  </div>
                </motion.div>

                {/* Decorative Pill */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#2e3192] to-[#4c99e9] rounded-full -z-10 blur-2xl opacity-20 animate-pulse" />
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            {slides.length > 1 && (
              <div className="absolute top-1/2 -right-6 lg:-right-12 -translate-y-1/2 flex flex-col gap-4 z-30">
                {slides.map((_, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className="group relative flex items-center justify-end"
                  >
                    <span className={`mr-4 text-[10px] font-bold transition-all duration-300 ${idx === currentSlideIndex ? 'opacity-100 translate-x-0 text-[#2e3192]' : 'opacity-0 translate-x-4'}`}>
                      0{idx + 1}
                    </span>
                    <div className={`transition-all duration-500 rounded-full ${idx === currentSlideIndex ? 'w-12 h-3 bg-[#2e3192] shadow-lg shadow-[#2e3192]/30' : 'w-3 h-3 bg-gray-300 hover:bg-[#2e3192]/40'}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Floating Appointment Bar - Refined */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 relative z-30 lg:-mb-16"
        >
          <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white/50 p-8 lg:p-10 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="John Doe" className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl pl-12 pr-5 py-4 transition-all outline-none" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Service</label>
                <select className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl px-5 py-4 transition-all outline-none appearance-none cursor-pointer">
                  <option>Physiotherapy</option>
                  <option>Rehabilitation</option>
                  <option>Pain Management</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Preferred Date</label>
                <input type="date" className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl px-5 py-4 transition-all outline-none cursor-pointer" />
              </div>
              <Button className="w-full bg-[#2e3192] hover:bg-[#1a1c3d] text-white rounded-2xl py-8 shadow-xl shadow-[#2e3192]/20 font-bold text-lg active:scale-95 transition-all">
                Book Analysis
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default HeroSection;
