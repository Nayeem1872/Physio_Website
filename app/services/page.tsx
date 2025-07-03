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
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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
  const serviceCategories = [
    {
      id: "manual",
      name: "Manual & Sports Therapy",
      icon: Target,
      description: "Hands-on treatment and sports rehabilitation",
    },
    {
      id: "specialized",
      name: "Specialized Care",
      icon: Stethoscope,
      description: "Age-specific and condition-focused treatments",
    },
    {
      id: "advanced",
      name: "Advanced Techniques",
      icon: Zap,
      description: "Modern therapeutic interventions",
    },
  ];

  const services = {
    manual: [
      {
        icon: Target,
        title: "Manual Therapy",
        description:
          "Hands-on approach using joint mobilization, soft tissue work, and massage techniques.",
        fullDescription:
          "Manual therapy is a hands-on approach used by physical therapists to address musculoskeletal pain and improve function. It involves a variety of skilled movements, including joint mobilization, soft tissue work, and massage, to target specific areas and address underlying issues. The goal is to reduce pain, improve range of motion, and enhance overall mobility.",
        duration: "45-60 minutes",
        price: "Contact for pricing",
        benefits: [
          "Reduced pain and inflammation",
          "Improved range of motion",
          "Enhanced mobility",
          "Better circulation",
          "Muscle tension relief",
        ],
        color: "from-[#2e3192] to-[#4c46a3]",
      },
      {
        icon: Activity,
        title: "Sports Rehabilitation",
        description:
          "Specialized therapy for musculoskeletal injuries using exercise and therapeutic interventions.",
        fullDescription:
          "Sports rehabilitation is a type of physical therapy that treats people of all ages who have musculoskeletal system pain, injury, or illness. With the use of exercise, movement, and therapeutic interventions, sports rehabilitation helps maintain health and fitness and helps you recover from injury and reduce pain.",
        duration: "60-90 minutes",
        price: "Contact for pricing",
        benefits: [
          "Faster return to sport",
          "Injury prevention strategies",
          "Performance optimization",
          "Sport-specific training",
          "Biomechanical analysis",
        ],
        color: "from-green-500 to-green-600",
      },
      {
        icon: Zap,
        title: "Dry Needling",
        description:
          "Thin needles inserted into trigger points to relieve pain and improve movement.",
        fullDescription:
          "Dry needling is a physical therapy technique where thin needles are inserted into specific areas of the muscle, often where trigger points are located, to relieve pain and improve movement. It's a pain management and physical therapy tool used to address muscle tightness, pain, and movement restriction.",
        duration: "30-45 minutes",
        price: "Contact for pricing",
        benefits: [
          "Pain relief",
          "Muscle tension reduction",
          "Improved movement",
          "Trigger point release",
          "Enhanced recovery",
        ],
        color: "from-red-500 to-red-600",
      },
    ],
    specialized: [
      {
        icon: Shield,
        title: "Post-Surgical Rehabilitation",
        description:
          "Structured program to regain strength, mobility, and function after surgery.",
        fullDescription:
          "Post-surgical rehabilitation is a crucial process that helps individuals regain strength, mobility, and function after surgery. It involves a structured program of exercises, therapies, and lifestyle adjustments designed to support healing and prevent complications. The goal is to restore physical function, reduce pain and swelling, and improve overall quality of life.",
        duration: "45-75 minutes",
        price: "Contact for pricing",
        benefits: [
          "Accelerated healing",
          "Reduced complications",
          "Improved mobility",
          "Pain management",
          "Functional restoration",
        ],
        color: "from-purple-500 to-purple-600",
      },
      {
        icon: Baby,
        title: "Pediatric Physiotherapy",
        description:
          "Specialized care for children from birth to 19 years focusing on optimal development.",
        fullDescription:
          "Pediatric physiotherapy is a specialized area of physiotherapy that focuses on the assessment, treatment, and care of children from birth to 19 years of age. These therapists use their expertise in child development and conditions to help children achieve their optimal physical development and independence. They work with children experiencing movement issues, developmental delays, or injuries, often in collaboration with families and other healthcare professionals.",
        duration: "30-45 minutes",
        price: "Contact for pricing",
        benefits: [
          "Improved motor development",
          "Enhanced coordination",
          "Better posture",
          "Increased strength",
          "Social skill development",
        ],
        color: "from-pink-500 to-pink-600",
      },
      {
        icon: UserCheck,
        title: "Geriatric Physiotherapy",
        description:
          "Specialized care for older adults addressing age-related conditions.",
        fullDescription:
          "Geriatric physiotherapy is a specialized area of physiotherapy that focuses on the unique physical needs and challenges faced by older adults. It aims to improve and maintain mobility, function, and quality of life for seniors, often addressing age-related conditions like joint pain, balance issues, and reduced strength.",
        duration: "45-60 minutes",
        price: "Contact for pricing",
        benefits: [
          "Improved balance and stability",
          "Fall prevention",
          "Pain management",
          "Enhanced mobility",
          "Better quality of life",
        ],
        color: "from-orange-500 to-orange-600",
      },
    ],
    advanced: [
      {
        icon: Zap,
        title: "Dry Needling",
        description:
          "Thin needles inserted into trigger points to relieve pain and improve movement.",
        fullDescription:
          "Dry needling is a physical therapy technique where thin needles are inserted into specific areas of the muscle, often where trigger points are located, to relieve pain and improve movement. It's a pain management and physical therapy tool used to address muscle tightness, pain, and movement restriction.",
        duration: "30-45 minutes",
        price: "Contact for pricing",
        benefits: [
          "Pain relief",
          "Muscle tension reduction",
          "Improved movement",
          "Trigger point release",
          "Enhanced recovery",
        ],
        color: "from-red-500 to-red-600",
      },
      {
        icon: Zap,
        title: "Electrotherapy",
        description:
          "Medical treatment using electrical currents to address various conditions.",
        fullDescription:
          "Electrotherapy is a form of medical treatment that uses electrical currents to address various conditions, primarily for pain management, muscle stimulation, and tissue healing. It's commonly used in physiotherapy to complement other treatment approaches.",
        duration: "20-30 minutes",
        price: "Contact for pricing",
        benefits: [
          "Pain reduction",
          "Muscle stimulation",
          "Improved circulation",
          "Tissue healing",
          "Reduced inflammation",
        ],
        color: "from-blue-500 to-blue-600",
      },
    ],
  };

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
                  Call: 01684522924
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

          <Tabs defaultValue="manual" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-12"
            >
              {/* Responsive TabsList */}
              <TabsList className="grid w-full max-w-4xl grid-cols-1 sm:grid-cols-3 bg-gray-200 p-1.5 rounded-xl h-auto">
                {serviceCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex flex-row items-center justify-start sm:justify-center space-x-3 py-3 px-4 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-[#2e3192] rounded-lg transition-all duration-300"
                  >
                    <category.icon className="h-6 w-6 flex-shrink-0" />
                    <div className="text-left sm:text-center">
                      <div className="font-semibold">{category.name}</div>
                      <div className="hidden sm:block text-xs opacity-70">
                        {category.description}
                      </div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {serviceCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                  {services[category.id as keyof typeof services].map(
                    (service) => (
                      <motion.div
                        key={service.title}
                        variants={fadeInUp}
                        className="h-full"
                      >
                        <Card className="h-full flex flex-col border-gray-200/80 shadow-md hover:shadow-xl hover:border-[#2e3192] transition-all duration-300 group">
                          <CardHeader className="items-center text-center pb-4">
                            <div
                              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                            >
                              <service.icon className="h-8 w-8" />
                            </div>
                            <CardTitle className="text-xl font-bold text-gray-800">
                              {service.title}
                            </CardTitle>
                            <CardDescription className="text-gray-500 pt-1">
                              {service.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex flex-col flex-grow space-y-4">
                            <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                              {service.fullDescription}
                            </p>

                            <div className="space-y-2 pt-2">
                              <h4 className="font-semibold text-gray-800 text-sm">
                                Key Benefits:
                              </h4>
                              <ul className="space-y-1.5">
                                {service.benefits.map((benefit, i) => (
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
                                  <span className="font-medium">
                                    {service.duration}
                                  </span>
                                </div>
                                <div className="text-lg font-bold text-[#2e3192]">
                                  {service.price}
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
                    )
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
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
                  Call 01684522924
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
