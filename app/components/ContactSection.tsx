import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Image from "next/image"; // 1. Import the Next.js Image component

const ContactSection = () => {
  return (
    <div>
      <section className="py-20 relative overflow-hidden">
        {/* 2. Replace the <img> tag with the <Image> component */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/pic4.jpg" // Path is the same (must be in /public)
            alt="Physiotherapist guiding a patient through exercises." // Descriptive alt text is important!
            layout="fill" // Makes the image fill its parent div
            objectFit="cover" // Same as the CSS property 'object-fit: cover'
            quality={75} // Optional: control image quality (1-100)
            priority // Optional: add if the image is "above the fold" to preload it
          />
          {/* The gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-blue-900/80" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Recovery Journey?
              </h2>
              <p className="text-lg  mb-8">
                Our team of expert physiotherapists is ready to help you achieve
                your health and mobility goals. Book an appointment today and
                take the first step towards a pain-free life.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-indigo-700 font-bold hover:bg-gray-200 h-12 px-8 rounded-full shadow-lg transition-all duration-300"
                >
                  <Link href="/book" className="flex items-center">
                    Book Your Appointment
                    <ArrowRight size={20} className="ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;
