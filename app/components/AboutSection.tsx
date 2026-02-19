import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Award, CalendarDays, Clock, Heart, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/config";

interface Banner {
  _id: string;
  section: string;
  images: string[];
  title: string;
  subtitle: string;
  isActive: boolean;
}

interface AboutSectionProps {
  banner: Banner | null;
  isLoading: boolean;
}

const AboutSection = ({ banner, isLoading }: AboutSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = banner?.images?.length ? banner.images : ["/images/pic3.jpg"];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/images/pic3.jpg";
    if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
      return imagePath;
    }
    const baseUrl = BACKEND_URL || "";
    return `${baseUrl}${imagePath}`;
  };

  const title = banner?.title || "Excellence in Physiotherapy Care Since 2024";
  const subtitle =
    banner?.subtitle ||
    "Reflex Physiotherapy was established in 2024 with a vision to provide comprehensive and patient-centered physiotherapy care. Our team of dedicated professionals brings diverse expertise and a shared commitment to helping patients recover, regain mobility, and enhance their quality of life.";

  const paragraphs = subtitle.split("\n\n").filter((p) => p.trim());

  return (
    <section id="about" className="py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <Badge
              variant="outline"
              className="bg-[#2e3192]/5 text-[#2e3192] border-[#2e3192]/10 mb-5 py-1.5 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest"
            >
              Our Medical Center
            </Badge>

            <h2 className="text-3xl lg:text-5xl font-bold text-[#1a1c3d] mb-8 leading-[1.2]">
              {title}
            </h2>

            <div className="space-y-5 mb-10">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base lg:text-lg text-gray-500 leading-relaxed opacity-90"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { Icon: CalendarDays, number: "2024", label: "Year Founded" },
                { Icon: Heart, number: "100", suffix: "%", label: "Satisfaction" },
                { Icon: MapPin, number: "Uttara", label: "Main Facility" },
                { Icon: Clock, number: "24/7", label: "Care Support" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-[#2e3192]/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-xl shadow-sm text-[#2e3192] group-hover:bg-[#2e3192] group-hover:text-white transition-all">
                      <stat.Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#1a1c3d]">{stat.number}{stat.suffix}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/about">
              <Button
                size="lg"
                className="bg-[#2e3192] hover:bg-[#1a1c3d] text-white px-8 py-6 rounded-xl font-bold shadow-xl shadow-[#2e3192]/20 transition-all active:scale-95"
              >
                <Award className="mr-2 h-5 w-5" />
                Discovery Our Journey
              </Button>
            </Link>
          </motion.div>

          {/* Right Visuals */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative group max-w-[500px] mx-auto lg:ml-auto">
              {isLoading ? (
                <div className="w-full aspect-[1.1] bg-gray-100 rounded-[2.5rem] animate-pulse" />
              ) : (
                <div className="relative w-full aspect-[1.1] overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-gray-50">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={getImageUrl(images[currentImageIndex])}
                      alt="Reflex Physiotherapy Center"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/pic3.jpg";
                      }}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c3d]/40 via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-6 right-6 left-6 p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl">
                    <p className="text-[10px] font-black opacity-80 uppercase tracking-widest mb-1">Reflex Standard</p>
                    <p className="text-lg font-bold font-serif italic leading-tight">Empowering patients with modern physiotherapy solutions.</p>
                  </div>
                </div>
              )}

              {/* Floating Experience Badge - More subtle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
                className="absolute -top-6 -right-6 bg-white p-5 rounded-full shadow-2xl border-4 border-[#f6f5ff] flex flex-col items-center justify-center w-32 h-32 z-20"
              >
                <p className="text-2xl font-black text-[#2e3192]">2+</p>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest text-center mt-0.5">Years of<br />Expertise</p>
                <div className="mt-1.5 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-2 h-2 fill-[#2e3192] text-[#2e3192]" />)}
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full bg-blue-50/50 rounded-full blur-[80px] opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
