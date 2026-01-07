"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Play, Filter } from "lucide-react";
import Image from "next/image";

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("all");

  const allTestimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      age: 34,
      condition: "Post-Surgery Recovery",
      category: "surgery",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "After my knee surgery, I was worried about recovery. The team at Reflex made the entire process smooth and encouraging. Within 3 months, I was back to my normal activities. Their personalized approach made all the difference!",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: false,
      date: "December 2025",
    },
    {
      id: 2,
      name: "Mohammad Rahman",
      age: 45,
      condition: "Chronic Back Pain",
      category: "pain",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "I suffered from chronic back pain for years. The physiotherapists at Reflex not only relieved my pain but also taught me exercises to prevent it from coming back. I'm finally living pain-free!",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: false,
      date: "November 2025",
    },
    {
      id: 3,
      name: "Fatima Khan",
      age: 28,
      condition: "Sports Injury",
      category: "sports",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "As an athlete, getting back to peak performance was crucial. Reflex's sports rehabilitation program was exactly what I needed. Professional, caring, and results-driven!",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: true,
      date: "January 2026",
    },
    {
      id: 4,
      name: "Ahmed Hassan",
      age: 52,
      condition: "Stroke Recovery",
      category: "neuro",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "After my stroke, I didn't think I'd walk again. The neurological rehabilitation team at Reflex worked miracles. Their patience and expertise helped me regain my independence.",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: true,
      date: "October 2025",
    },
    {
      id: 5,
      name: "Nadia Islam",
      age: 38,
      condition: "Pregnancy-Related Pain",
      category: "pain",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "During my pregnancy, I experienced severe back pain. The prenatal physiotherapy sessions were a lifesaver. The therapists were gentle, knowledgeable, and truly cared about my comfort.",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: false,
      date: "September 2025",
    },
    {
      id: 6,
      name: "Karim Abdullah",
      age: 19,
      condition: "ACL Reconstruction",
      category: "sports",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "Tore my ACL playing football. The post-surgery rehab at Reflex was intense but effective. I'm back on the field now, stronger than ever. Thank you, Reflex team!",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: true,
      date: "August 2025",
    },
    {
      id: 7,
      name: "Ayesha Begum",
      age: 67,
      condition: "Arthritis Management",
      category: "geriatric",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "Living with arthritis was becoming unbearable. The geriatric physiotherapy program helped me manage my pain and improve my mobility. I can now enjoy time with my grandchildren!",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: false,
      date: "July 2025",
    },
    {
      id: 8,
      name: "Rashed Khan",
      age: 41,
      condition: "Shoulder Injury",
      category: "surgery",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "Rotator cuff surgery left me unable to lift my arm. The manual therapy and exercises at Reflex restored my shoulder function completely. Highly recommend their services!",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: false,
      date: "June 2025",
    },
    {
      id: 9,
      name: "Lamia Hossain",
      age: 8,
      condition: "Cerebral Palsy",
      category: "pediatric",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "Our daughter has cerebral palsy, and the pediatric physiotherapy team at Reflex has been amazing. They've helped her gain strength and confidence. We're so grateful!",
      videoThumbnail: "/placeholder.jpg",
      hasVideo: true,
      date: "May 2025",
      isParentReview: true,
    },
  ];

  const categories = [
    { value: "all", label: "All Stories" },
    { value: "surgery", label: "Post-Surgery" },
    { value: "sports", label: "Sports Injury" },
    { value: "pain", label: "Pain Management" },
    { value: "neuro", label: "Neurological" },
    { value: "geriatric", label: "Geriatric Care" },
    { value: "pediatric", label: "Pediatric Care" },
  ];

  const filteredTestimonials =
    filter === "all"
      ? allTestimonials
      : allTestimonials.filter((t) => t.category === filter);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-white text-[#2e3192] mb-4">
              Patient Success Stories
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Real Stories, Real Results
            </h1>
            <p className="text-xl text-blue-100">
              Hear from our patients about their journey to recovery and how
              Reflex Physiotherapy helped them regain their strength, mobility,
              and confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center flex-wrap gap-3">
            <Filter className="h-5 w-5 text-gray-600" />
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={filter === category.value ? "default" : "outline"}
                onClick={() => setFilter(category.value)}
                className={
                  filter === category.value
                    ? "bg-[#2e3192] hover:bg-[#2e3192]"
                    : ""
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Image/Video Header */}
                    <div className="relative h-48 bg-gradient-to-br from-[#2e3192] to-[#4c46a3]">
                      <Image
                        src={testimonial.videoThumbnail}
                        alt={testimonial.name}
                        fill
                        className="object-cover opacity-70"
                      />
                      {testimonial.hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer shadow-xl"
                          >
                            <Play className="h-8 w-8 text-[#2e3192] ml-1" />
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                          className="rounded-full border-2 border-[#2e3192]"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Age {testimonial.age}
                          </p>
                          <Badge
                            variant="outline"
                            className="mt-1 text-xs border-[#2e3192] text-[#2e3192]"
                          >
                            {testimonial.condition}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-4 italic">
                        "{testimonial.text}"
                      </p>

                      <p className="text-sm text-gray-500">{testimonial.date}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join hundreds of satisfied patients who have trusted Reflex
              Physiotherapy with their rehabilitation needs.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192] hover:to-[#4c46a3] text-white px-8"
              asChild
            >
              <a href="/book">Book Your Appointment Today</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
