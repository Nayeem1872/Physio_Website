"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Phone,
  Mail,
  Clock,
  Award,
  Users,
  Heart,
  Target,
  BookOpen,
  Star,
  CheckCircle,
  Stethoscope,
  Brain,
  Baby,
  UserCheck,
  Zap,
  Hand,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
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

interface TeamMember {
  _id: string;
  profileImage: string;
  fullName: string;
  title: string;
  specialization: string;
  experience: string;
  education: string;
  certifications: string[];
  specialties: string[];
  biography: string;
  email: string;
  phone: string;
  availability: string;
  languages: string[];
}

const iconMap: { [key: string]: any } = {
  Hand,
  Baby,
  UserCheck,
  Stethoscope,
  Zap,
  Brain,
};

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/team`);
        const data = await response.json();
        setTeamMembers(data.teamMembers || []);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const teamStats = [
    {
      number: `${teamMembers.length}+`,
      label: "Expert Therapists",
      icon: Users,
    },
    { number: "50+", label: "Years Combined Experience", icon: Award },
    { number: "100%", label: "Patient Satisfaction", icon: Heart },
    { number: "24/7", label: "Support Available", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="bg-[#2e3192]/10 text-[#2e3192] mb-4"
              >
                <Users className="h-3 w-3 mr-1" />
                Our Expert Team
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Meet Our
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
                Dedicated Professionals
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Our diverse team of healthcare professionals brings together
              decades of experience and specialized expertise to provide you
              with the best possible care. Each member is committed to helping
              you achieve your health and wellness goals through evidence-based
              practice and personalized treatment plans.
            </motion.p>
          </motion.div>

          {/* Team Stats */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {teamStats.map((stat, index) => (
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

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-xl">Loading team members...</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12"
            >
              {teamMembers.map((member, index) => {
                const IconComponent =
                  iconMap[
                  Object.keys(iconMap)[index % Object.keys(iconMap).length]
                  ] || Hand;

                return (
                  <motion.div
                    key={member._id}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="group h-full"
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
                      <div className="grid md:grid-cols-5 gap-0 h-full">
                        {/* Image Section */}
                        <div className="md:col-span-2 relative">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={`${BACKEND_URL}${member.profileImage}`}
                              alt={member.fullName}
                              width={400}
                              height={500}
                              className="w-full h-64 md:h-full object-cover"
                            />
                          </motion.div>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          />
                          <motion.div
                            className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg"
                            whileHover={{ scale: 1.1 }}
                          >
                            <IconComponent className="h-6 w-6 text-[#2e3192]" />
                          </motion.div>
                        </div>

                        {/* Content Section */}
                        <CardContent className="md:col-span-3 p-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                                {member.fullName}
                              </h3>
                              <p className="text-[#2e3192] font-medium text-lg mb-2">
                                {member.title}
                              </p>
                              <p className="text-gray-600 font-medium">
                                {member.specialization}
                              </p>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 font-medium">
                                  Experience:
                                </span>
                                <span className="font-semibold">
                                  {member.experience}
                                </span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600 font-medium">
                                  Education:
                                </span>
                                <p className="font-semibold mt-1">
                                  {member.education}
                                </p>
                              </div>
                            </div>

                            {member.certifications &&
                              member.certifications.length > 0 && (
                                <div>
                                  <p className="text-sm text-gray-600 font-medium mb-2">
                                    Certifications:
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {member.certifications.map((cert, i) => (
                                      <Badge
                                        key={i}
                                        variant="secondary"
                                        className="text-xs bg-[#2e3192]/10 text-[#2e3192]"
                                      >
                                        {cert}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                            {member.specialties &&
                              member.specialties.length > 0 && (
                                <div>
                                  <p className="text-sm text-gray-600 font-medium mb-2">
                                    Specialties:
                                  </p>
                                  <div className="grid grid-cols-2 gap-1">
                                    {member.specialties.map((specialty, i) => (
                                      <div
                                        key={i}
                                        className="flex items-center text-xs text-gray-600"
                                      >
                                        <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                                        {specialty}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            <p className="text-sm text-gray-600 leading-relaxed">
                              {member.biography}
                            </p>

                            <div className="space-y-2 pt-4 border-t border-gray-100">
                              <div className="flex items-center text-sm text-gray-600">
                                <Mail className="h-4 w-4 mr-2 text-[#2e3192]" />
                                {member.email}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Phone className="h-4 w-4 mr-2 text-[#2e3192]" />
                                {member.phone}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-2 text-[#2e3192]" />
                                {member.availability}
                              </div>
                              {member.languages &&
                                member.languages.length > 0 && (
                                  <div className="flex items-center text-sm text-gray-600">
                                    <BookOpen className="h-4 w-4 mr-2 text-[#2e3192]" />
                                    Languages: {member.languages.join(", ")}
                                  </div>
                                )}
                            </div>

                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="pt-4"
                            >
                              <Link href="/book">
                                <Button
                                  size="sm"
                                  className="w-full bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#252a7a] hover:to-[#3d3d8a]"
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Book with {member.fullName.split(" ")[0]}
                                </Button>
                              </Link>
                            </motion.div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Choose Our Team */}
      <section className="py-20 bg-gradient-to-r from-[#2e3192]/5 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#2e3192]/10 text-[#2e3192] mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Makes Our Team Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team combines expertise, compassion, and innovation to deliver
              exceptional care that transforms lives.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Target,
                title: "Evidence-Based Practice",
                description:
                  "All our treatments are based on the latest research and proven methodologies for optimal outcomes.",
                color: "from-[#2e3192] to-[#4c46a3]",
              },
              {
                icon: Heart,
                title: "Compassionate Care",
                description:
                  "We treat every patient with empathy, respect, and genuine concern for their wellbeing.",
                color: "from-red-500 to-red-600",
              },
              {
                icon: Users,
                title: "Collaborative Approach",
                description:
                  "Our team works together with patients and families to create comprehensive treatment plans.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Award,
                title: "Specialized Expertise",
                description:
                  "Each team member brings unique specializations to address diverse patient needs effectively.",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: BookOpen,
                title: "Continuous Learning",
                description:
                  "We stay updated with the latest techniques and technologies in physiotherapy and rehabilitation.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Star,
                title: "Patient-Centered Care",
                description:
                  "Every treatment plan is tailored to individual needs, goals, and lifestyle preferences.",
                color: "from-purple-500 to-purple-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-6">
                    <motion.div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2e3192] to-[#4c46a3]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Meet Our Team?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Schedule a consultation with one of our expert physiotherapists
              and take the first step towards your recovery journey. Our team is
              here to help you achieve your health and wellness goals.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div {...scaleOnHover}>
                <Link href="/book">
                  <Button
                    size="lg"
                    className="bg-white text-[#2e3192] hover:bg-gray-100 px-8 py-3 font-semibold"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Consultation
                  </Button>
                </Link>
              </motion.div>
              <motion.div {...scaleOnHover}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#2e3192] px-8 py-3 font-semibold bg-transparent"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call 01684522924
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
