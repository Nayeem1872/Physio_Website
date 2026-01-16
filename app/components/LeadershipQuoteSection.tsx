"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Award, Lightbulb } from "lucide-react";

interface Leadership {
  _id: string;
  name: string;
  position: string;
  role: "chairman" | "ceo" | "other";
  quote: string;
  image: string;
  badge: string;
  order: number;
  published: boolean;
}

interface LeadershipQuoteSectionProps {
  leadership: Leadership;
  imagePosition: "left" | "right";
  index: number;
}

export default function LeadershipQuoteSection({
  leadership,
  imagePosition,
}: LeadershipQuoteSectionProps) {
  const isChairman = leadership.role === "chairman";
  const gradientColor = isChairman
    ? "from-[#2e3192] to-[#4c46a3]"
    : "from-green-500 to-green-600";

  return (
    <section className="py-12 px-4 overflow-hidden">
      <div className="container mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`flex flex-col lg:flex-row gap-8 items-center ${
            imagePosition === "right" ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image Side - 30% */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "left" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-[30%] flex-shrink-0"
          >
            <div className="relative max-w-xs mx-auto">
              {/* Decorative Background */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute inset-0 bg-gradient-to-br ${gradientColor} rounded-full opacity-10 blur-3xl`}
              />

              {/* Main Image Container */}
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`relative w-64 h-64 mx-auto rounded-full overflow-hidden shadow-2xl bg-gradient-to-br ${gradientColor} border-4 border-white`}
                >
                  <Image
                    src={`http://localhost:5000${leadership.image}`}
                    alt={leadership.name}
                    fill
                    className="object-cover"
                  />

                  {/* Overlay Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${gradientColor} opacity-10`}
                  />
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl p-3 min-w-[200px]"
                >
                  <div className="flex items-center gap-2 justify-center">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradientColor} flex items-center justify-center flex-shrink-0`}
                    >
                      {isChairman ? (
                        <Award className="h-4 w-4 text-white" />
                      ) : (
                        <Lightbulb className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900 text-xs">
                        {leadership.position}
                      </p>
                      <p className="text-[10px] text-gray-600">
                        {leadership.badge || "Reflex Physiotherapy"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Quote Side - 70% */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "left" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-[70%]"
          >
            <div className="space-y-4">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span
                  className={`inline-block px-3 py-1.5 rounded-full bg-gradient-to-r ${gradientColor} text-white text-xs font-semibold mb-3`}
                >
                  {isChairman ? "Leadership Vision" : "Founder's Message"}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  {leadership.name}
                </h2>
                <p
                  className={`text-lg font-semibold ${
                    isChairman ? "text-[#2e3192]" : "text-green-600"
                  }`}
                >
                  {leadership.position}
                </p>
              </motion.div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Quote
                  className={`absolute -top-3 -left-2 h-12 w-12 ${
                    isChairman ? "text-[#2e3192]" : "text-green-500"
                  } opacity-20`}
                />

                <blockquote className="relative pl-6 space-y-3">
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                    "{leadership.quote}"
                  </p>
                </blockquote>

                <Quote
                  className={`absolute -bottom-3 -right-2 h-12 w-12 ${
                    isChairman ? "text-[#2e3192]" : "text-green-500"
                  } opacity-20 rotate-180`}
                />
              </motion.div>

              {/* Decorative Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                viewport={{ once: true }}
                className={`h-1 w-20 bg-gradient-to-r ${gradientColor} rounded-full`}
              />

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 pt-2"
              >
                <div
                  className={`flex items-center gap-2 text-xs ${
                    isChairman ? "text-[#2e3192]" : "text-green-600"
                  } font-semibold`}
                >
                  {isChairman ? (
                    <>
                      <Award className="h-4 w-4" />
                      <span>Leading with Vision & Excellence</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-4 w-4" />
                      <span>Innovation Meets Compassion</span>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
