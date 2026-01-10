"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Activity,
  Zap,
  Shield,
  Target,
  Heart,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Calendar,
  Award,
  Users,
  Star,
  Stethoscope,
  Baby,
  UserCheck,
  Loader2,
  Hand,
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useServices } from "../hooks/useServices";
import { useContactInfo } from "../hooks/useContactInfo";
import { useState, useMemo } from "react";

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

export default function ServicesPage() {
  const { services, isLoading } = useServices();
  const { contactInfo } = useContactInfo();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    Activity,
    Baby,
    Shield,
    Target,
    UserCheck,
    Zap,
    Hand,
    Stethoscope,
  };

  // Color mapping
  const colorMap: { [key: string]: string } = {
    "Manual Therapy": "from-[#2e3192] to-[#4c46a3]",
    "Sports Rehabilitation": "from-green-500 to-green-600",
    "Post-Surgical Rehabilitation": "from-purple-500 to-purple-600",
    "Pediatric Physiotherapy": "from-pink-500 to-pink-600",
    "Geriatric Physiotherapy": "from-orange-500 to-orange-600",
    "Dry Needling": "from-red-500 to-red-600",
    "Electrotherapy": "from-blue-500 to-blue-600",
  };

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(services.map((s) => s.category._id))
    ).map((id) => {
      const service = services.find((s) => s.category._id === id);
      return service?.category;
    }).filter(Boolean);

    return uniqueCategories;
  }, [services]);

  // Filter services by category
  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return services;
    return services.filter((s) => s.category._id === activeCategory);
  }, [services, activeCategory]);

  const faqs = [
    {
      question: "How long does each physiotherapy session last?",
      answer:
        "Most physiotherapy sessions last between 45-60 minutes, depending on your specific treatment plan and needs. Initial assessments may take up to 90 minutes.",
    },
    {
      question: "Do I need a referral from my doctor?",
      answer:
        "While a referral is not always required, we recommend consulting with your physician first. Many insurance plans require a referral for coverage.",
    },
    {
      question: "What should I wear to my appointment?",
      answer:
        "Wear comfortable, loose-fitting clothing that allows easy movement. Athletic wear is ideal. You may need to expose the area being treated.",
    },
    {
      question: "How many sessions will I need?",
      answer:
        "The number of sessions varies depending on your condition, severity, and individual response to treatment. Most patients see improvement within 4-6 sessions.",
    },
    {
      question: "What conditions do you treat?",
      answer:
        "We treat a wide range of conditions including sports injuries, post-surgical recovery, chronic pain, pediatric conditions, geriatric issues, and more.",
    },
    {
      question: "Do you offer home visits?",
      answer:
        "Yes, we offer home physiotherapy services for patients who cannot visit our clinic. Please contact us to discuss availability and pricing.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="bg-[#2e3192]/10 text-[#2e3192] mb-6"
              >
                <Stethoscope className="h-3 w-3 mr-1" />
                Professional Services
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Comprehensive
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
                Rehabilitation Services
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              From manual therapy to advanced techniques, our expert team
              provides evidence-based treatments designed to help you restore
              movement, relieve pain, and regain strength.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div {...scaleOnHover}>
                <Link href="/book">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#252a7a] hover:to-[#3d3d8a] text-white px-8 py-3"
                  >
                    Schedule Consultation
                    <Calendar className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div {...scaleOnHover}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#2e3192] text-[#2e3192] hover:bg-[#2e3192]/5 px-8 py-3 bg-transparent"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call: {contactInfo?.phone[0] || "01684522924"}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center space-x-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {[
                { icon: Award, label: "Evidence-Based" },
                { icon: Users, label: "Expert Team" },
                { icon: Star, label: "Quality Care" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] p-2 rounded-lg">
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Service Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of physiotherapy services using
              advanced techniques to meet all your rehabilitation needs.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 text-[#2e3192] animate-spin" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No services available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center mb-12"
              >
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      activeCategory === "all"
                        ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    All Services
                  </button>
                  {categories.map((category: any) => {
                    const IconComponent = iconMap[category.icon] || Stethoscope;
                    return (
                      <button
                        key={category._id}
                        onClick={() => setActiveCategory(category._id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                          activeCategory === category._id
                            ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Services Grid */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
              >
                {filteredServices.map((service) => {
                  const IconComponent = iconMap[service.category.icon] || Activity;
                  const colorClass =
                    colorMap[service.category.name] || "from-[#2e3192] to-[#4c46a3]";

                  return (
                    <motion.div
                      key={service._id}
                      variants={fadeInUp}
                      className="h-full"
                    >
                      <Card className="h-full flex flex-col border-gray-200/80 shadow-md hover:shadow-xl hover:border-[#2e3192] transition-all duration-300 group">
                        <CardHeader className="items-center text-center pb-4">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <CardTitle className="text-xl font-bold text-gray-800">
                            {service.name}
                          </CardTitle>
                          <CardDescription className="text-gray-500 pt-1">
                            {service.shortDescription}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow space-y-4">
                          <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                            {service.detailedDescription}
                          </p>

                          <div className="space-y-2 pt-2">
                            <h4 className="font-semibold text-gray-800 text-sm">
                              Key Benefits:
                            </h4>
                            <ul className="space-y-1.5">
                              {service.keyBenefits.map((benefit, i) => (
                                <li
                                  key={i}
                                  className="flex items-center space-x-2 text-sm text-gray-700"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="border-t pt-4 mt-auto">
                            <div className="flex justify-between items-center text-sm mb-4">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Clock className="h-4 w-4 text-[#2e3192]" />
                                <span className="font-medium">{service.duration}</span>
                              </div>
                              <div className="text-lg font-bold text-[#2e3192]">
                                {service.pricing}
                              </div>
                            </div>
                            <Link href="/book" className="w-full">
                              <Button className="w-full bg-[#2e3192] hover:bg-[#252a7a]">
                                Book This Service
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Our Services */}
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
              Why Choose Reflex
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Sets Our Services Apart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to evidence-based practice and patient-centered
              care makes us the preferred choice for rehabilitation services in
              Uttara.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Award,
                title: "Evidence-Based Practice",
                description:
                  "All treatments based on latest research and proven methodologies.",
              },
              {
                icon: Target,
                title: "Personalized Plans",
                description:
                  "Customized treatment plans tailored to your specific condition and goals.",
              },
              {
                icon: Zap,
                title: "Advanced Techniques",
                description:
                  "Modern therapeutic approaches including dry needling and electrotherapy.",
              },
              {
                icon: Heart,
                title: "Compassionate Care",
                description:
                  "Patient-centered approach with emphasis on comfort and support.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#2e3192]/10 text-[#2e3192] mb-4">FAQ</Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our services, treatments,
              and what to expect during your visit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-[#2e3192] hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
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
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Don't let pain or injury hold you back. Our expert team at Reflex
              is ready to help you restore movement, relieve pain, and regain
              strength.
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
                  Call {contactInfo?.phone[0] || "01684522924"}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Clock,
                  title: "Flexible Hours",
                  desc: "Appointment-based scheduling",
                },
                {
                  icon: Shield,
                  title: "Expert Care",
                  desc: "Evidence-based treatments",
                },
                {
                  icon: Users,
                  title: "Personalized Treatment",
                  desc: "Individual care plans",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-white/20 p-4 rounded-full mb-4">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
