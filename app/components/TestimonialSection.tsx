"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Star, Play, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      age: 34,
      condition: "Post-Surgery Recovery",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "After my knee surgery, I was worried about recovery. The team at Reflex made the entire process smooth and encouraging. Within 3 months, I was back to my normal activities. Their personalized approach made all the difference!",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: false,
    },
    {
      id: 2,
      name: "Mohammad Rahman",
      age: 45,
      condition: "Chronic Back Pain",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "I suffered from chronic back pain for years. The physiotherapists at Reflex not only relieved my pain but also taught me exercises to prevent it from coming back. I'm finally living pain-free!",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: false,
    },
    {
      id: 3,
      name: "Fatima Khan",
      age: 28,
      condition: "Sports Injury",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "As an athlete, getting back to peak performance was crucial. Reflex's sports rehabilitation program was exactly what I needed. Professional, caring, and results-driven!",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: true,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-[#2e3192] text-white mb-4">Patient Stories</Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who trusted us with their recovery journey
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
                      {/* Image/Video Side */}
                      <div className="relative h-[400px] md:h-auto bg-gradient-to-br from-[#2e3192] to-[#4c46a3]">
                        <Image
                          src={testimonials[currentIndex].videoThumbnail}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover opacity-80"
                        />
                        {testimonials[currentIndex].hasVideo && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer shadow-xl">
                              <Play className="h-10 w-10 text-[#2e3192] ml-1" />
                            </div>
                          </motion.div>
                        )}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                            <div className="flex items-center space-x-4">
                              <Image
                                src={testimonials[currentIndex].image}
                                alt={testimonials[currentIndex].name}
                                width={60}
                                height={60}
                                className="rounded-full border-4 border-white shadow-md"
                              />
                              <div>
                                <h4 className="font-bold text-gray-800">
                                  {testimonials[currentIndex].name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Age {testimonials[currentIndex].age} • {testimonials[currentIndex].condition}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                        <Quote className="h-12 w-12 text-[#2e3192] opacity-20 mb-6" />
                        
                        <div className="flex mb-4">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                          "{testimonials[currentIndex].text}"
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-6 border-t">
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
