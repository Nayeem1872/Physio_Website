"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  ArrowRight,
  Baby,
  Shield,
  Target,
  UserCheck,
  Zap,
  Hand,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useServices } from "../hooks/useServices";

const ServiceSection = () => {
  const { services, isLoading } = useServices();

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

  // Icon mapping based on category icon name
  const iconMap: { [key: string]: any } = {
    Activity,
    Baby,
    Shield,
    Target,
    UserCheck,
    Zap,
    Hand,
  };

  // Color mapping for different categories
  const colorMap: { [key: string]: string } = {
    "Manual Therapy": "from-[#2e3192] to-[#4c46a3]",
    "Sports Rehabilitation": "from-green-500 to-green-600",
    "Post-Surgical Rehabilitation": "from-purple-500 to-purple-600",
    "Pediatric Physiotherapy": "from-pink-500 to-pink-600",
    "Geriatric Physiotherapy": "from-orange-500 to-orange-600",
    "Dry Needling": "from-red-500 to-red-600",
    "Electrotherapy": "from-blue-500 to-blue-600",
  };

  return (
    <div>
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#2e3192] text-white">Our Services</Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Comprehensive Rehabilitation Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From manual therapy to specialized rehabilitation, we offer
              advanced treatments tailored to your unique needs using
              evidence-based practice.
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
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.slice(0, 6).map((service, index) => {
                const IconComponent = iconMap[service.category.icon] || Activity;
                const colorClass =
                  colorMap[service.category.name] || "from-[#2e3192] to-[#4c46a3]";

                return (
                  <motion.div
                    key={service._id}
                    variants={fadeInUp}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                      <CardHeader className="text-center pb-4">
                        <motion.div
                          className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </motion.div>
                        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-[#2e3192] transition-colors">
                          {service.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600 text-center leading-relaxed mb-4">
                          {service.shortDescription}
                        </CardDescription>
                        <motion.div
                          className="mt-6 text-center"
                          whileHover={{ x: 5 }}
                        >
                          <Link
                            href="/services"
                            className="text-[#2e3192] font-medium inline-flex items-center hover:text-[#4c46a3]"
                          >
                            Learn More
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServiceSection;
