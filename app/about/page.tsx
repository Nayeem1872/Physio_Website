"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Heart,
  Users,
  Award,
  Calendar,
  Phone,
  Clock,
  CheckCircle,
  Target,
  BookOpen,
  Globe,
  UserCheck,
  Lightbulb,
  TrendingUp,
  Building,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BACKEND_URL } from "@/lib/config";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export default function AboutPage() {
  const [milestones, setMilestones] = useState([
    {
      year: "2024",
      title: "Reflex Physiotherapy Founded",
      description:
        "Established with a vision to provide comprehensive and patient-centered physiotherapy care to individuals of all ages in Uttara.",
    },
    {
      year: "2024",
      title: "Advanced Techniques Integration",
      description:
        "Expanded services to include manual therapy, dry needling, electrotherapy, and sports rehabilitation.",
    },
    {
      year: "2024",
      title: "Community Trust",
      description:
        "Built strong reputation for excellence and trust within the Uttara community through evidence-based practice.",
    },
    {
      year: "2024",
      title: "Specialized Programs",
      description:
        "Launched pediatric and geriatric physiotherapy programs to serve all age groups.",
    },
    {
      year: "2024",
      title: "Technology Integration",
      description:
        "Incorporated latest technologies and therapeutic approaches for optimal patient outcomes.",
    },
    {
      year: "Present",
      title: "Continued Excellence",
      description:
        "Continuing to evolve and provide the best rehabilitation services in Uttara with individualized treatment plans.",
    },
  ]);

  const [leadership, setLeadership] = useState<any[]>([]);
  const [aboutBanners, setAboutBanners] = useState<string[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    // Fetch milestones from API
    const fetchMilestones = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/milestones`);
        if (response.ok) {
          const data = await response.json();
          if (data.milestones && data.milestones.length > 0) {
            setMilestones(data.milestones);
          }
        }
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    // Fetch leadership from API
    const fetchLeadership = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/leadership`);
        if (response.ok) {
          const data = await response.json();
          if (data.leadership && data.leadership.length > 0) {
            setLeadership(data.leadership);
          }
        }
      } catch (error) {
        console.error("Error fetching leadership:", error);
      }
    };

    // Fetch about banner from API
    const fetchBanner = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/banners?isActive=true`
        );
        if (response.ok) {
          const banners = await response.json();
          const aboutBannerData = banners.find(
            (b: any) => b.section === "about"
          );
          if (
            aboutBannerData &&
            aboutBannerData.images &&
            aboutBannerData.images.length > 0
          ) {
            setAboutBanners(aboutBannerData.images);
          }
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchMilestones();
    fetchLeadership();
    fetchBanner();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (aboutBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % aboutBanners.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [aboutBanners]);

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description:
        "We treat every patient with empathy, respect, and genuine concern for their wellbeing.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Target,
      title: "Evidence-Based Practice",
      description:
        "All our treatments are based on the latest research and proven methodologies.",
      color: "from-[#2e3192] to-[#4c46a3]",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace new technologies and techniques to provide the most effective treatments.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: UserCheck,
      title: "Integrity",
      description:
        "We maintain the highest ethical standards and build trust through honest communication.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We work as a team with patients, families, and healthcare providers for optimal outcomes.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description:
        "We constantly learn and evolve to provide better care and achieve superior results.",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const stats = [
    { number: "2024", label: "Established", icon: Calendar },
    { number: "100%", label: "Patient Focused", icon: TrendingUp },
    { number: "Uttara", label: "Community", icon: Building },
    { number: "Expert", label: "Team", icon: Award },
    { number: "Advanced", label: "Techniques", icon: Target },
    { number: "24/7", label: "Support", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge
                  variant="outline"
                  className="bg-[#2e3192]/10 text-[#2e3192]"
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  Our Story
                </Badge>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Dedicated to Your
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#2e3192] to-[#4c46a3]"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {" "}
                  Recovery Journey
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Reflex Physiotherapy was established in 2024 with a vision to
                provide comprehensive and patient-centered physiotherapy care to
                individuals of all ages. The clinic started as a small practice
                catering to local residents in Uttara, with a strong emphasis on
                evidence-based practice and individualized treatment plans.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.div {...scaleOnHover}>
                  <Link href="/team">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#252a7a] hover:to-[#3d3d8a] text-white px-8 py-3"
                    >
                      Meet Our Team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div {...scaleOnHover}>
                  <Link href="/book">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#2e3192] text-[#2e3192] hover:bg-[#2e3192]/5 px-8 py-3 bg-transparent"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Us
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                {/* Carousel Container */}
                <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                  {aboutBanners.length > 0 ? (
                    <>
                      {/* Images */}
                      {aboutBanners.map((banner, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: currentBannerIndex === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={`${BACKEND_URL}${banner}`}
                            alt={`Reflex Physiotherapy ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ))}

                      {/* Navigation Dots */}
                      {aboutBanners.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                          {aboutBanners.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentBannerIndex(index)}
                              className={`w-3 h-3 rounded-full transition-all ${
                                currentBannerIndex === index
                                  ? "bg-white w-8"
                                  : "bg-white/50 hover:bg-white/75"
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Navigation Arrows */}
                      {aboutBanners.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setCurrentBannerIndex(
                                (prev) =>
                                  (prev - 1 + aboutBanners.length) %
                                  aboutBanners.length
                              )
                            }
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                          >
                            <svg
                              className="w-6 h-6 text-gray-800"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              setCurrentBannerIndex(
                                (prev) => (prev + 1) % aboutBanners.length
                              )
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                          >
                            <svg
                              className="w-6 h-6 text-gray-800"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <Image
                      src="/placeholder.svg?height=600&width=500"
                      alt="Reflex Physiotherapy Team"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Floating Achievement Badges */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#2e3192]/10 text-[#2e3192] mb-4">
              Our Foundation
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Mission, Vision & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core principles guide everything we do, from patient care to
              community involvement in Uttara.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: "Our Mission",
                content:
                  "To provide comprehensive and patient-centered physiotherapy care to individuals of all ages in Uttara, using evidence-based practice and individualized treatment plans to help patients recover, regain mobility, and enhance their quality of life.",
                color: "from-[#2e3192] to-[#4c46a3]",
              },
              {
                icon: Globe,
                title: "Our Vision",
                content:
                  "To be the leading physiotherapy center in Uttara, recognized for excellence, innovation, and compassionate care that transforms lives through advanced therapeutic approaches and community trust.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Heart,
                title: "Our Promise",
                content:
                  "We promise to treat every patient with dignity, respect, and the highest level of professional care, supporting them every step of their recovery journey with evidence-based treatments and personalized attention.",
                color: "from-red-500 to-red-600",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <CardHeader className="pb-4">
                    <motion.div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These values shape our culture and guide our interactions with
              patients, families, and the Uttara community.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <value.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h4 className="text-lg font-bold text-gray-800 mb-3">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Quotes */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#2e3192]/10 text-[#2e3192] mb-4">
              Leadership Insights
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Words from Our Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the visionaries who guide our mission and commitment to
              excellence in physiotherapy care.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Display leadership from API or fallback to default */}
            {leadership.length > 0 ? (
              leadership.map((leader, index) => {
                const getRoleColor = (role: string) => {
                  switch (role) {
                    case "chairman":
                      return "from-[#2e3192] to-[#4c46a3]";
                    case "ceo":
                      return "from-green-500 to-green-600";
                    default:
                      return "from-purple-500 to-purple-600";
                  }
                };

                return (
                  <motion.div
                    key={leader._id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${getRoleColor(leader.role)} p-6`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <Image
                              src={`${BACKEND_URL}${leader.image}`}
                              alt={leader.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-white">
                            <h3 className="text-xl font-bold">{leader.name}</h3>
                            <p className="text-sm text-white/90">
                              {leader.position}
                            </p>
                            <Badge className="mt-1 bg-white/20 text-white border-0">
                              {leader.badge || "Reflex Physiotherapy"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-8">
                        <div className="relative">
                          <motion.div
                            className={`absolute -top-4 -left-2 text-6xl ${
                              leader.role === "chairman"
                                ? "text-[#2e3192]/10"
                                : "text-green-500/10"
                            } font-serif`}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            "
                          </motion.div>
                          <p className="text-gray-700 text-lg leading-relaxed italic pl-8 mb-4">
                            {leader.quote}
                          </p>
                          <motion.div
                            className={`absolute -bottom-2 right-0 text-6xl ${
                              leader.role === "chairman"
                                ? "text-[#2e3192]/10"
                                : "text-green-500/10"
                            } font-serif`}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 1.5,
                            }}
                          >
                            "
                          </motion.div>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${
                            leader.role === "chairman"
                              ? "text-[#2e3192]"
                              : "text-green-600"
                          } mt-6 pt-4 border-t border-gray-200`}
                        >
                          {leader.role === "chairman" ? (
                            <Award className="h-5 w-5" />
                          ) : (
                            <Lightbulb className="h-5 w-5" />
                          )}
                          <span className="text-sm font-semibold">
                            {leader.role === "chairman"
                              ? "Leading with Vision & Excellence"
                              : "Innovation Meets Compassion"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <>
                {/* Fallback: Chairman Quote */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <Image
                            src="/placeholder.svg?height=80&width=80"
                            alt="Chairman"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-white">
                          <h3 className="text-xl font-bold">
                            Dr. [Chairman Name]
                          </h3>
                          <p className="text-sm text-white/90">Chairman</p>
                          <Badge className="mt-1 bg-white/20 text-white border-0">
                            Reflex Physiotherapy
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="relative">
                        <motion.div
                          className="absolute -top-4 -left-2 text-6xl text-[#2e3192]/10 font-serif"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          "
                        </motion.div>
                        <p className="text-gray-700 text-lg leading-relaxed italic pl-8 mb-4">
                          At Reflex Physiotherapy, we believe that every patient
                          deserves personalized care that addresses not just
                          their symptoms, but their overall wellbeing. Our
                          commitment to evidence-based practice and
                          compassionate care has been the cornerstone of our
                          success in serving the Uttara community.
                        </p>
                        <motion.div
                          className="absolute -bottom-2 right-0 text-6xl text-[#2e3192]/10 font-serif"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 1.5,
                          }}
                        >
                          "
                        </motion.div>
                      </div>
                      <div className="flex items-center gap-2 text-[#2e3192] mt-6 pt-4 border-t border-gray-200">
                        <Award className="h-5 w-5" />
                        <span className="text-sm font-semibold">
                          Leading with Vision & Excellence
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* CEO/Founder Quote */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <Image
                            src="/placeholder.svg?height=80&width=80"
                            alt="CEO & Founder"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-white">
                          <h3 className="text-xl font-bold">
                            Dr. [Founder Name]
                          </h3>
                          <p className="text-sm text-white/90">CEO & Founder</p>
                          <Badge className="mt-1 bg-white/20 text-white border-0">
                            Reflex Physiotherapy
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="relative">
                        <motion.div
                          className="absolute -top-4 -left-2 text-6xl text-green-500/10 font-serif"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          "
                        </motion.div>
                        <p className="text-gray-700 text-lg leading-relaxed italic pl-8 mb-4">
                          When I founded Reflex Physiotherapy, my vision was
                          simple yet profound: to create a center where advanced
                          therapeutic techniques meet genuine human compassion.
                          We don't just treat conditions; we transform lives by
                          empowering our patients to achieve their fullest
                          potential.
                        </p>
                        <motion.div
                          className="absolute -bottom-2 right-0 text-6xl text-green-500/10 font-serif"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 1.5,
                          }}
                        >
                          "
                        </motion.div>
                      </div>
                      <div className="flex items-center gap-2 text-green-600 mt-6 pt-4 border-t border-gray-200">
                        <Lightbulb className="h-5 w-5" />
                        <span className="text-sm font-semibold">
                          Innovation Meets Compassion
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#2e3192]/10 text-[#2e3192] mb-4">
              Our Journey
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Building Excellence Since 2024
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From our establishment to becoming a trusted name in Uttara,
              here's our story of growth and commitment to excellence.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year + index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Year Badge */}
                      <div className="md:w-48 bg-gradient-to-br from-[#2e3192] to-[#4c46a3] p-6 flex flex-col items-center justify-center text-white">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.3,
                          }}
                        >
                          <Calendar className="h-12 w-12 mb-3 opacity-80" />
                        </motion.div>
                        <div className="text-4xl font-bold mb-1">
                          {milestone.year}
                        </div>
                        <div className="text-sm text-white/80">
                          {index === milestones.length - 1
                            ? "Today"
                            : "Milestone"}
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="flex-1 p-6 md:p-8">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#2e3192]/10 to-[#4c46a3]/10 flex items-center justify-center"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <CheckCircle className="h-6 w-6 text-[#2e3192]" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                              {milestone.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </div>

                    {/* Progress Indicator */}
                    {index < milestones.length - 1 && (
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                        <motion.div
                          animate={{
                            y: [0, 5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#2e3192]"
                        >
                          <div className="w-2 h-2 bg-[#2e3192] rounded-full"></div>
                        </motion.div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Final Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white px-8 py-4 rounded-full shadow-xl">
                <Award className="h-6 w-6" />
                <span className="text-lg font-bold">
                  Continuing Our Journey of Excellence
                </span>
                <TrendingUp className="h-6 w-6" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#2e3192]/10 text-[#2e3192] mb-4">
              Our Impact
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Reflex by the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These represent our commitment to excellence and the trust the
              Uttara community has placed in us.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-10 w-10 text-white" />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold text-[#2e3192] mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.2,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
