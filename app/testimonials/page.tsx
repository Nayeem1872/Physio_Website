"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Play, Filter } from "lucide-react";
import { BACKEND_URL } from "@/lib/config";
import VideoGallerySection from "../components/VideoGallerySection";

interface Testimonial {
  _id: string;
  profileMedia: string;
  mediaType: string;
  bannerMedia?: string;
  bannerMediaType?: string;
  fullName: string;
  role: string;
  rating: number;
  testimonial: string;
  service: string;
  date: string;
  published: boolean;
}

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("all");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/testimonials`);
        if (response.ok) {
          const data = await response.json();
          const allTestimonials = data.testimonials || [];
          // Filter out testimonials that are intended for the video gallery
          setTestimonials(
            allTestimonials.filter(
              (t: Testimonial) => t.bannerMediaType !== "video",
            ),
          );
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const getMediaUrl = (mediaPath: string) => {
    if (mediaPath.startsWith("http")) {
      return mediaPath;
    }
    return `${BACKEND_URL}${mediaPath}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Get unique services for filter
  const services = ["all", ...new Set(testimonials.map((t) => t.service))];

  const filteredTestimonials =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.service === filter);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleVideoClick = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <span>✕</span> Close
            </button>
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <video
                src={currentVideo}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl object-contain bg-black"
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-[#2e3192] text-white hover:bg-[#1a1c3d] mb-4 py-1.5 px-6 rounded-full text-sm font-semibold tracking-wide shadow-lg shadow-blue-900/10">
              Patient Stories
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              What Our Patients Say
            </h1>
            <p className="text-xl text-gray-600">
              Real stories from real people who trusted us with their recovery
              journey. Read about their experiences and transformations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3]"
                  : ""
              }
            >
              <Filter className="h-4 w-4 mr-2" />
              All Stories
            </Button>
            {services
              .filter((s) => s !== "all")
              .map((service) => (
                <Button
                  key={service}
                  variant={filter === service ? "default" : "outline"}
                  onClick={() => setFilter(service)}
                  className={
                    filter === service
                      ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3]"
                      : ""
                  }
                >
                  {service}
                </Button>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl h-96 animate-pulse"
                />
              ))}
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                No testimonials found for this category.
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                    <CardContent className="p-0">
                      {/* Banner/Logo Section */}
                      <div className="relative h-64 bg-white flex flex-col items-center justify-start overflow-hidden">
                        {testimonial.bannerMedia ? (
                          // Show Banner Media
                          <>
                            {testimonial.bannerMediaType === "video" ? (
                              <div className="relative w-full h-full group">
                                <video
                                  src={getMediaUrl(testimonial.bannerMedia)}
                                  className="w-full h-full object-cover"
                                  muted
                                  loop
                                  autoPlay
                                />
                                {/* Play Button Overlay */}
                                <div
                                  onClick={() =>
                                    handleVideoClick(
                                      getMediaUrl(testimonial.bannerMedia!),
                                    )
                                  }
                                  className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <div className="bg-white/90 rounded-full p-4 hover:bg-white transition-colors">
                                    <Play className="h-8 w-8 text-[#2e3192]" />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <img
                                src={getMediaUrl(testimonial.bannerMedia)}
                                alt="Banner"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </>
                        ) : (
                          // Show Reflex Logo (default)
                          <div className="w-full h-full flex flex-col items-center justify-start p-6 pt-8">
                            <motion.div
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="mb-auto"
                            >
                              <img
                                src="/images/logo3.png"
                                alt="Reflex Physiotherapy"
                                className="w-32 h-auto object-contain"
                              />
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 left-4 w-12 h-12 border-2 border-[#2e3192]/10 rounded-full"></div>
                            <div className="absolute bottom-20 right-4 w-10 h-10 border-2 border-[#4c46a3]/10 rounded-full"></div>
                          </div>
                        )}

                        {/* Patient Info Card - Always visible */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] rounded-xl p-3 shadow-lg">
                            <div className="flex items-center space-x-3">
                              <img
                                src={getMediaUrl(testimonial.profileMedia)}
                                alt={testimonial.fullName}
                                className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                              />
                              <div>
                                <h4 className="font-bold text-white text-sm">
                                  {testimonial.fullName}
                                </h4>
                                <p className="text-xs text-white/90">
                                  {testimonial.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {testimonial.service}
                          </Badge>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">
                          "{testimonial.testimonial}"
                        </p>

                        <div className="text-sm text-gray-500">
                          {formatDate(testimonial.date)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of satisfied patients who trusted us with their care
            </p>
            <Button
              size="lg"
              className="bg-white text-[#2e3192] hover:bg-gray-100"
            >
              Book Your Appointment
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
