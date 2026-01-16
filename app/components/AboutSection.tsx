import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Award, CalendarDays, Clock, Heart, MapPin } from "lucide-react";
import Image from "next/image";
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
    <div>
      <section
        id="about"
        className="py-20 bg-gradient-to-r from-blue-50 to-green-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 mb-4 "
              >
                About Reflex Physiotherapy
              </Badge>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">{title}</h2>
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { Icon: CalendarDays, number: 2024, label: "Established" },
                  {
                    Icon: Heart,
                    number: 100,
                    suffix: "%",
                    label: "Patient Focused",
                  },
                  { Icon: MapPin, number: 1, label: "Community in Uttara" },
                  {
                    Icon: Clock,
                    number: 24,
                    suffix: "/7",
                    label: "Dedicated Support",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    // Added a little padding and background for a card-like feel
                    className="text-center p-4 bg-white/50 rounded-lg"
                  >
                    {/* THIS IS THE LINE THAT WAS MISSING */}
                    <stat.Icon className="w-10 h-10 mx-auto mb-3 text-[#3b3eac]" />

                    <motion.div
                      className="text-3xl font-bold text-[#2e3192] mb-2"
                      // The pulsing animation is okay, but a count-up is often more impressive.
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {stat.number}
                      {stat.suffix && (
                        // The suffix should probably match the number's style
                        <span className="text-3xl font-bold text-[#2e3192]">
                          {stat.suffix}
                        </span>
                      )}
                    </motion.div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div {...scaleOnHover}>
                <Link href="/about">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192] hover:to-[#4c46a3]"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Learn More About Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {isLoading ? (
                  <div className="w-full h-[500px] bg-gray-200 rounded-2xl animate-pulse" />
                ) : (
                  <div className="relative w-full h-[500px]">
                    <img
                      src={getImageUrl(images[currentImageIndex])}
                      alt="Reflex Physiotherapy"
                      className="rounded-2xl shadow-2xl object-cover w-full h-full"
                    />
                    {/* Image Indicators */}
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex
                                ? "bg-white w-6"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              <motion.div
                className="absolute -top-6 -left-6 bg-white p-6 rounded-xl shadow-lg"
                animate={{
                  rotate: [0, 5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2e3192]">
                    Evidence
                  </div>
                  <div className="text-sm text-gray-600">Based Practice</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
