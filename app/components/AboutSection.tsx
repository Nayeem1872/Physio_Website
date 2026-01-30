import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Award, CalendarDays, Clock, Heart, MapPin } from "lucide-react";
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
  const title = banner?.title || "Excellence in Physiotherapy Care Since 2024";
  const subtitle =
    banner?.subtitle ||
    "Reflex Physiotherapy was established in 2024 with a vision to provide comprehensive and patient-centered physiotherapy care to individuals of all ages. The clinic started as a small practice catering to local residents in Uttara.\n\nOver time, Reflex Physiotherapy has grown significantly, expanding its services to include advanced techniques such as manual therapy, dry needling, electrotherapy, sports rehabilitation, and post-surgical recovery. Our team of dedicated professionals brings diverse expertise and a shared commitment to helping patients recover, regain mobility, and enhance their quality of life.";
  const images = banner?.images || ["/images/pic3.jpg"];

  // Split subtitle into paragraphs
  const paragraphs = subtitle.split("\n\n").filter((p) => p.trim());
  return (
    <section id="about" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-100 mb-6 py-1.5 px-4 rounded-full"
            >
              Why Choose Reflex?
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1c3d] mb-8 leading-tight">
              {title}
            </h2>
            <div className="space-y-6 mb-10">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-gray-500 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-12">
              {[
                { Icon: CalendarDays, number: "2024", label: "Established" },
                {
                  Icon: Heart,
                  number: "100",
                  suffix: "%",
                  label: "Patient Focused",
                },
                { Icon: MapPin, number: "Uttara", label: "Location" },
                {
                  Icon: Clock,
                  number: "24/7",
                  label: "Care Support",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm text-[#2e3192] group-hover:bg-[#2e3192] group-hover:text-white transition-colors">
                      <stat.Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 group-hover:text-[#2e3192] transition-colors">
                        {stat.number}{stat.suffix}
                      </div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...scaleOnHover} className="inline-block">
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-[#2e3192] hover:bg-[#1a1c3d] text-white px-8 py-6 rounded-2xl font-semibold shadow-lg shadow-blue-100 transition-all"
                >
                  <Award className="mr-2 h-5 w-5" />
                  Read Full Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {isLoading ? (
                <div className="w-full aspect-[4/5] bg-gray-100 rounded-[2.5rem] animate-pulse" />
              ) : (
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-black/5">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={getImageUrl(images[currentImageIndex])}
                      alt="Reflex Physiotherapy Center"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>

                  {/* Floating badge inside image */}
                  <div className="absolute bottom-6 right-6 left-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Our Facility</p>
                    <p className="text-xl font-bold">State-of-the-art Rehabilitation Center</p>
                  </div>
                </div>
              )}

              {/* Decorative elements */}
              <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-60" />
              <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60" />

              {/* Experience Card */}

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
