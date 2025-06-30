"use client";

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
  MapPin,
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
  const milestones = [
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
  ];

  const teamMembers = [
    {
      name: "Dr. Maksudur Rahman",
      role: "Lead Physiotherapist & Founder",
      specialization: "Manual Therapy & Sports Rehabilitation",
      experience: "Expert in Evidence-Based Practice",
      education: "DPT, Advanced Manual Therapy Certification",
      certifications: [
        "Manual Therapy Certified",
        "Sports Specialist",
        "Dry Needling",
      ],
      bio: "Dr. Maksudur founded Reflex Physiotherapy with a passion for providing comprehensive, patient-centered care. He specializes in manual therapy and sports rehabilitation using evidence-based approaches.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Dr. Farhan Ahmed",
      role: "Pediatric Physiotherapy Specialist",
      specialization: "Child Development & Movement",
      experience: "Pediatric Care Expert",
      education: "DPT, Pediatric Physiotherapy Specialization",
      certifications: [
        "Pediatric Specialist",
        "NDT Certified",
        "Sensory Integration",
      ],
      bio: "Dr. Farhan specializes in pediatric physiotherapy, helping children from birth to 19 years achieve optimal physical development and independence.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Dr. Rafiq Hassan",
      role: "Geriatric Physiotherapy Specialist",
      specialization: "Elderly Care & Mobility",
      experience: "Senior Care Specialist",
      education: "DPT, Geriatric Rehabilitation Certification",
      certifications: [
        "Geriatric Specialist",
        "Fall Prevention",
        "Balance Training",
      ],
      bio: "Dr. Rafiq focuses on geriatric physiotherapy, addressing age-related conditions and helping seniors maintain mobility and quality of life.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Dr. Fatima Khan",
      role: "Post-Surgical Rehabilitation Specialist",
      specialization: "Surgical Recovery & Rehabilitation",
      experience: "Post-Surgical Care Expert",
      education: "DPT, Orthopedic Manual Therapy",
      certifications: [
        "Orthopedic Specialist",
        "Post-Surgical Rehab",
        "Manual Therapy",
      ],
      bio: "Dr. Fatima specializes in post-surgical rehabilitation, helping patients regain strength and function after various surgical procedures.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ];

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
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] p-2 rounded-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Reflex</h1>
                  <p className="text-xs text-gray-600">
                    Physiotherapy & Rehab Center
                  </p>
                </div>
              </Link>
            </motion.div>

            <nav className="hidden md:flex space-x-8">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "About", href: "/about" },
                { name: "Team", href: "#team" },
                { name: "Contact", href: "/#contact" },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    item.name === "About"
                      ? "text-[#2e3192] border-b-2 border-[#2e3192]"
                      : "text-gray-700 hover:text-[#2e3192]"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            <motion.div {...scaleOnHover}>
              <Link href="/book">
                <Button className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#252a7a] hover:to-[#3d3d8a]">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

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
                <Badge className="bg-[#2e3192]/10 text-[#2e3192]">
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
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#252a7a] hover:to-[#3d3d8a] text-white px-8 py-3"
                  >
                    Meet Our Team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div {...scaleOnHover}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#2e3192] text-[#2e3192] hover:bg-[#2e3192]/5 px-8 py-3 bg-transparent"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Reflex Physiotherapy Team"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>

              {/* Floating Achievement Badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Evidence-Based</p>
                    <p className="text-xs text-gray-600">Practice</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Uttara</p>
                    <p className="text-xs text-gray-600">Community Care</p>
                  </div>
                </div>
              </motion.div>
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

      {/* Company Timeline */}
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

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#2e3192] to-[#4c46a3] rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year + index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold text-[#2e3192] mb-2">
                            {milestone.year}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-3">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <motion.div
                    className="w-6 h-6 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] rounded-full border-4 border-white shadow-lg z-10"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
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

      {/* Team Section */}
      <section
        id="team"
        className="py-20 bg-gradient-to-r from-gray-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#2e3192]/10 text-[#2e3192] mb-4">
              Our Team
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of professionals brings diverse expertise and a
              shared commitment to helping patients recover, regain mobility,
              and enhance their quality of life.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-64 object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#2e3192] font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      {member.specialization}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-medium">{member.experience}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Education:</span>
                        <p className="font-medium">{member.education}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-2">
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

                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {member.bio}
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#252a7a] hover:to-[#3d3d8a]"
                      >
                        View Full Profile
                      </Button>
                    </motion.div>
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
            <h2 className="text-4xl font-bold mb-6">
              Ready to Begin Your Recovery Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join the Uttara community members who have trusted Reflex
              Physiotherapy with their recovery. Our experienced team is ready
              to help you achieve your health and wellness goals.
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Link href="/" className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] p-2 rounded-lg">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Reflex</h3>
                    <p className="text-sm text-gray-400">
                      Physiotherapy & Rehab Center
                    </p>
                  </div>
                </Link>
              </motion.div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner in recovery and rehabilitation. Helping you
                move better and live healthier in Uttara.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  "Manual Therapy",
                  "Sports Rehabilitation",
                  "Post-Surgical Rehab",
                  "Pediatric Care",
                ].map((service) => (
                  <motion.li
                    key={service}
                    whileHover={{ x: 5, color: "#60A5FA" }}
                  >
                    <Link
                      href="/services"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {service}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  { name: "Home", href: "/" },
                  { name: "Services", href: "/services" },
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "/#contact" },
                ].map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5, color: "#60A5FA" }}
                  >
                    <Link
                      href={link.href}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>01684522924</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>House#17, Road#05, Sector#12, Level#05, Uttara</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>physiomaksudur24@gmail.com</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          >
            <p>
              &copy; {new Date().getFullYear()} Reflex Physiotherapy & Rehab
              Center. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
