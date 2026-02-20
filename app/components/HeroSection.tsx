import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, Star, Users, Phone, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { BACKEND_URL } from "@/lib/config";
import toast from "react-hot-toast";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: "Physiotherapy Analysis",
          status: "pending"
        }),
      });

      if (response.ok) {
        toast.success("Appointment request sent!");
        setFormData({ name: "", email: "", phone: "", date: "" });
      } else {
        toast.error("Failed to send request. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    if (slides.length <= 1 || isLoading) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length, isLoading]);

  const currentSlide = slides[currentSlideIndex];
  const slideImage = currentSlide?.image;

  if (isLoading) {
    return (
      <div className="relative min-h-[90vh] lg:min-h-[85vh] bg-[#f8faff] flex flex-col items-center justify-center overflow-hidden">
        {/* Decorative background for loader */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-[#2e3192]/5 -skew-x-12 translate-x-1/4 -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-[100px] -z-10" />

        <div className="relative flex flex-col items-center gap-6">
          <div className="w-20 h-20 border-4 border-[#2e3192]/10 border-t-[#2e3192] rounded-full animate-spin" />
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-black text-[#1a1c3d] animate-pulse">Reflex Physiotherapy</h3>
            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Loading Premium Experience...</p>
          </div>
        </div>
      </div>
    );
  }

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
                  {contactInfo?.phone?.[0] ? (
                    <a href={`tel:${contactInfo.phone[0]}`}>
                      <Button
                        variant="outline"
                        className="rounded-2xl border-2 border-[#2e3192]/20 text-[#2e3192] hover:bg-[#2e3192]/5 px-10 py-7 text-lg font-bold transition-all hover:translate-y-[-4px] flex items-center gap-3"
                      >
                        <Phone className="w-5 h-5" />
                        {contactInfo.phone[0]}
                      </Button>
                    </a>
                  ) : (
                    <Link href="#contact">
                      <Button
                        variant="outline"
                        className="rounded-2xl border-2 border-[#2e3192]/20 text-[#2e3192] hover:bg-[#2e3192]/5 px-10 py-7 text-lg font-bold transition-all hover:translate-y-[-4px]"
                      >
                        Book Visit
                      </Button>
                    </Link>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Visuals */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full aspect-video group"
              >
                {/* Image Container with Dynamic Border */}
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm p-1.5 rounded-3xl shadow-[0_50px_100px_-20px_rgba(46,49,146,0.15)] ring-1 ring-black/5">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner">
                    <motion.img
                      key={slideImage}
                      initial={{ scale: 1.15, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        scale: { duration: 12, ease: "linear" },
                        opacity: { duration: 0.8, ease: "easeOut" }
                      }}
                      src={getImageUrl(slideImage)}
                      alt={currentSlide.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/pic2.jpg";
                      }}
                    />
                    {/* Cinematic Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c3d]/20 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
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
                    <p className="text-2xl font-black text-[#1a1c3d]">100%</p>
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
          <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white/50 p-8 lg:p-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl pl-12 pr-5 py-4 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl pl-12 pr-5 py-4 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl pl-12 pr-5 py-4 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl px-5 py-4 transition-all outline-none cursor-pointer"
                />
              </div>
              <Button
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className="w-full bg-[#2e3192] hover:bg-[#1a1c3d] text-white rounded-2xl py-8 shadow-xl shadow-[#2e3192]/20 font-bold text-lg active:scale-95 transition-all disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Book Analysis"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default HeroSection;
