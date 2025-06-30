import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  return (
    <div>
      <section id="home" className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                  className="border-[#2e3192]/50 bg-white py-1 px-3 shadow-sm"
                >
                  <Heart className="h-4 w-4 mr-2 text-[#2e3192]" />
                  Your journey to better movement starts here
                </Badge>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Welcome to <br />
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
                  Reflex Physiotherapy <br /> & Rehab Center
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                At Reflex, we are dedicated to helping you restore movement,
                relieve pain, and regain strength. Our team of expert
                physiotherapists and rehabilitation specialists provide
                personalized care using advanced techniques and state-of-the-art
                equipment. Whether you're recovering from an injury, surgery, or
                managing a chronic condition, we're here to support your journey
                to better health and wellness.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.div {...scaleOnHover}>
                  <Link href="/book">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192] hover:to-[#4c46a3] text-white px-8 py-3"
                    >
                      Book an Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div {...scaleOnHover}>
                  <Link href="/services">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#2e3192] text-[#2e3192] hover:bg-blue-50 px-8 py-3 bg-transparent"
                    >
                      Our Services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-6 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-green-400 border-2 border-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    Trusted by Uttara Community
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    Excellence in Care
                  </span>
                </div>
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
                  src="/images/pic2.jpg"
                  alt="Patient undergoing physiotherapy at Reflex Center"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl object-cover w-full h-full"
                  priority
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute z-20 -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
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
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Expert Care</p>
                    <p className="text-xs text-gray-600">Since 2024</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute z-20 -bottom-4 -left-9 bg-white p-4 rounded-xl shadow-lg"
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
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
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
    </div>
  );
};

export default HeroSection;
