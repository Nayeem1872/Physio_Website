"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Calendar,
  Phone,
  Mail,
  MapPin,
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

export default function TeamPage() {
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
        "Evidence-Based Practice",
      ],
      bio: "Dr. Maksudur founded Reflex Physiotherapy with a passion for providing comprehensive, patient-centered care. He specializes in manual therapy and sports rehabilitation using evidence-based approaches. His expertise in advanced manual therapy techniques and commitment to individualized treatment plans has helped numerous patients in Uttara recover from various musculoskeletal conditions.",
      specialties: [
        "Manual Therapy Techniques",
        "Sports Injury Rehabilitation",
        "Dry Needling",
        "Joint Mobilization",
        "Soft Tissue Manipulation",
        "Exercise Prescription",
      ],
      image: "/placeholder.svg?height=500&width=400",
      email: "physiomaksudur24@gmail.com",
      phone: "01684522924",
      availability: "Mon-Sat: 9AM-7PM",
      languages: ["Bengali", "English"],
      icon: Hand,
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
        "Child Development",
      ],
      bio: "Dr. Farhan specializes in pediatric physiotherapy, helping children from birth to 19 years achieve optimal physical development and independence. Her gentle approach and expertise in child development make her a favorite among young patients and their families. She works closely with families to create engaging treatment plans that promote healthy development.",
      specialties: [
        "Developmental Delays",
        "Cerebral Palsy Management",
        "Sensory Integration",
        "Motor Skills Development",
        "Balance and Coordination",
        "Family Education",
      ],
      image: "/placeholder.svg?height=500&width=400",
      email: "Farhan.ahmed@reflexphysio.com",
      phone: "01684522925",
      availability: "Mon-Fri: 10AM-6PM",
      languages: ["Bengali", "English"],
      icon: Baby,
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
        "Mobility Enhancement",
      ],
      bio: "Dr. Rafiq focuses on geriatric physiotherapy, addressing age-related conditions and helping seniors maintain mobility and quality of life. His compassionate approach and understanding of the unique challenges faced by elderly patients make him an invaluable member of our team. He specializes in fall prevention and balance training programs.",
      specialties: [
        "Fall Prevention Programs",
        "Balance Training",
        "Arthritis Management",
        "Post-Stroke Rehabilitation",
        "Mobility Enhancement",
        "Pain Management",
      ],
      image: "/placeholder.svg?height=500&width=400",
      email: "rafiq.hassan@reflexphysio.com",
      phone: "01684522926",
      availability: "Mon-Sat: 8AM-5PM",
      languages: ["Bengali", "English"],
      icon: UserCheck,
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
        "Pain Management",
      ],
      bio: "Dr. Fatima specializes in post-surgical rehabilitation, helping patients regain strength and function after various surgical procedures. Her expertise in orthopedic conditions and systematic approach to recovery ensures optimal outcomes for patients undergoing rehabilitation after surgery.",
      specialties: [
        "Post-Surgical Recovery",
        "Orthopedic Rehabilitation",
        "Wound Care Management",
        "Strength Training",
        "Range of Motion Therapy",
        "Pain Reduction Techniques",
      ],
      image: "/placeholder.svg?height=500&width=400",
      email: "fatima.khan@reflexphysio.com",
      phone: "01684522927",
      availability: "Tue-Sat: 9AM-6PM",
      languages: ["Bengali", "English", "Urdu"],
      icon: Stethoscope,
    },
    {
      name: "Dr. Aminul Islam",
      role: "Electrotherapy & Pain Management Specialist",
      specialization: "Advanced Electrotherapy Techniques",
      experience: "Pain Management Expert",
      education: "DPT, Advanced Electrotherapy Certification",
      certifications: [
        "Electrotherapy Specialist",
        "TENS Therapy",
        "Ultrasound Therapy",
        "Pain Management",
      ],
      bio: "Dr. Aminul specializes in electrotherapy and advanced pain management techniques. His expertise in various electrotherapy modalities helps patients achieve faster recovery and effective pain relief. He combines traditional physiotherapy with modern electrotherapy techniques for optimal results.",
      specialties: [
        "TENS Therapy",
        "Ultrasound Therapy",
        "Electrical Stimulation",
        "Chronic Pain Management",
        "Muscle Re-education",
        "Tissue Healing",
      ],
      image: "/placeholder.svg?height=500&width=400",
      email: "aminul.islam@reflexphysio.com",
      phone: "01684522928",
      availability: "Mon-Fri: 10AM-7PM",
      languages: ["Bengali", "English"],
      icon: Zap,
    },
    {
      name: "Dr. Nasir Ahmed",
      role: "Neurological Rehabilitation Specialist",
      specialization: "Stroke & Brain Injury Recovery",
      experience: "Neuro Rehabilitation Expert",
      education: "DPT, Neurological Rehabilitation Specialization",
      certifications: [
        "Neuro Specialist",
        "Stroke Recovery",
        "Balance Training",
        "Cognitive Rehabilitation",
      ],
      bio: "Dr. Nasir specializes in neurological rehabilitation, helping patients recover from stroke, brain injuries, and other neurological conditions. His patient-centered approach and expertise in neuro-rehabilitation techniques have helped many patients regain independence and improve their quality of life.",
      specialties: [
        "Stroke Rehabilitation",
        "Brain Injury Recovery",
        "Balance and Coordination",
        "Gait Training",
        "Cognitive Rehabilitation",
        "Family Support",
      ],
      image: "/placeholder.svg?height=500&width=400",
      email: "nasir.ahmed@reflexphysio.com",
      phone: "01684522929",
      availability: "Mon-Sat: 9AM-6PM",
      languages: ["Bengali", "English"],
      icon: Brain,
    },
  ];

  const teamStats = [
    { number: "6+", label: "Expert Therapists", icon: Users },
    { number: "50+", label: "Years Combined Experience", icon: Award },
    { number: "100%", label: "Patient Satisfaction", icon: Heart },
    { number: "24/7", label: "Support Available", icon: Clock },
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
                { name: "Team", href: "/team" },
                { name: "Contact", href: "/#contact" },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    item.name === "Team"
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
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Image Section */}
                    <div className="md:col-span-2 relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
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
                        <member.icon className="h-6 w-6 text-[#2e3192]" />
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="md:col-span-3 p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-1">
                            {member.name}
                          </h3>
                          <p className="text-[#2e3192] font-medium text-lg mb-2">
                            {member.role}
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

                        <p className="text-sm text-gray-600 leading-relaxed">
                          {member.bio}
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
                          <div className="flex items-center text-sm text-gray-600">
                            <BookOpen className="h-4 w-4 mr-2 text-[#2e3192]" />
                            Languages: {member.languages.join(", ")}
                          </div>
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
                              Book with {member.name.split(" ")[1]}
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
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
                  { name: "Team", href: "/team" },
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
                  <Mail className="h-4 w-4" />
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
