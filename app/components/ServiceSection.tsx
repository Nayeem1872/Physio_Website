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
import { Button } from "@/components/ui/button";
import { useServices } from "../hooks/useServices";

const ServiceSection = () => {
  const { services, isLoading } = useServices();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
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
    "Manual Therapy": "bg-blue-50 text-[#2e3192]",
    "Sports Rehabilitation": "bg-green-50 text-green-600",
    "Post-Surgical Rehabilitation": "bg-purple-50 text-purple-600",
    "Pediatric Physiotherapy": "bg-pink-50 text-pink-600",
    "Geriatric Physiotherapy": "bg-orange-50 text-orange-600",
    "Dry Needling": "bg-red-50 text-red-600",
    "Electrotherapy": "bg-sky-50 text-sky-600",
  };

  return (
    <section id="services" className="py-24 bg-[#f8fafc] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2e3192 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="bg-white text-[#2e3192] border-blue-100 shadow-sm mb-4 py-1 px-4">Our Expertise</Badge>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1a1c3d] mb-6">
            Comprehensive Rehabilitation
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Advanced treatments tailored to your unique needs using evidence-based practice and state-of-the-art technology.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-12 w-12 text-[#2e3192] animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-gray-500 text-lg">Our services are being updated. Check back soon!</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {services.slice(0, 6).map((service) => {
              const IconComponent = iconMap[service.category.icon] || Activity;
              const colorClasses =
                colorMap[service.category.name] || "bg-blue-50 text-[#2e3192]";

              return (
                <motion.div
                  key={service._id}
                  variants={fadeInUp}
                  className="group h-full"
                >
                  <div className="h-full p-8 rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(46,49,146,0.1)] transition-all duration-500 relative flex flex-col group-hover:-translate-y-2">
                    <div className="flex justify-between items-start mb-8">
                      <div className={`p-4 rounded-2xl ${colorClasses} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="h-5 w-5 text-[#2e3192]" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#1a1c3d] mb-4 group-hover:text-[#2e3192] transition-colors uppercase tracking-tight">
                      {service.name}
                    </h3>

                    <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                      {service.shortDescription}
                    </p>

                    <Link
                      href={`/services#${service._id}`}
                      className="inline-flex items-center text-sm font-bold text-[#2e3192] group-hover:gap-2 transition-all"
                    >
                      LEARN MORE
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>

                    {/* Decorative element on card hover */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-blue-50/50 rounded-br-[2rem] -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Link href="/services">
            <Button variant="outline" size="lg" className="rounded-2xl border-2 border-gray-200 hover:border-[#2e3192] hover:text-[#2e3192] px-10 py-6 font-bold transition-all">
              View All Specialist Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
