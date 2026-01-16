"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Quote,
  Star,
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface Testimonial {
  _id: string;
  profileMedia: string;
  mediaType: string;
  fullName: string;
  role: string;
  rating: number;
  testimonial: string;
  service: string;
  date: string;
  published: boolean;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  isLoading: boolean;
}

const TestimonialSection = ({
  testimonials,
  isLoading,
}: TestimonialSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getMediaUrl = (mediaPath: string) => {
    if (mediaPath.startsWith("http")) {
      return mediaPath;
    }
    return `http://localhost:5000${mediaPath}`;
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-full h-96 bg-gray-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge className="bg-[#2e3192] text-white mb-4">
              Patient Stories
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600">
              No testimonials available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-[#2e3192] text-white mb-4">
            Patient Stories
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who trusted us with their recovery
            journey
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Left Side - Logo & Patient Info */}
                      <div className="relative h-[350px] bg-white flex flex-col items-center justify-start p-8 pt-12">
                        {/* Reflex Logo */}
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
                            className="w-48 h-auto object-contain"
                          />
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute top-8 left-8 w-20 h-20 border-2 border-[#2e3192]/10 rounded-full"></div>
                        <div className="absolute bottom-32 right-8 w-16 h-16 border-2 border-[#4c46a3]/10 rounded-full"></div>
                        <div className="absolute top-1/3 right-12 w-12 h-12 border-2 border-[#2e3192]/10 rounded-full"></div>

                        {/* Patient Info Card */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] rounded-xl p-4 shadow-lg">
                            <div className="flex items-center space-x-4">
                              <img
                                src={getMediaUrl(
                                  currentTestimonial.profileMedia
                                )}
                                alt={currentTestimonial.fullName}
                                className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                              />
                              <div>
                                <h4 className="font-bold text-white">
                                  {currentTestimonial.fullName}
                                </h4>
                                <p className="text-sm text-white/90">
                                  {currentTestimonial.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Content */}
                      <div className="p-6 md:p-8 flex flex-col justify-center bg-white">
                        <Quote className="h-10 w-10 text-[#2e3192] opacity-20 mb-4" />

                        {/* Service Badge */}
                        <div className="mb-3">
                          <Badge
                            variant="outline"
                            className="border-[#2e3192] text-[#2e3192]"
                          >
                            {currentTestimonial.service}
                          </Badge>
                        </div>

                        <div className="flex mb-3">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>

                        <p className="text-base text-gray-700 leading-relaxed mb-4 italic line-clamp-4">
                          "{currentTestimonial.testimonial}"
                        </p>

                        <p className="text-sm text-gray-500">
                          {new Date(currentTestimonial.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t">
                          <div className="flex space-x-2">
                            {testimonials.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  index === currentIndex
                                    ? "w-8 bg-[#2e3192]"
                                    : "w-2 bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={prevTestimonial}
                              className="rounded-full"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={nextTestimonial}
                              className="rounded-full"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/testimonials">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192] hover:to-[#4c46a3] text-white px-8"
              >
                View All Testimonials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
