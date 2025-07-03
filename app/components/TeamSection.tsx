import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const TeamSection = () => {
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
  return (
    <div>
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className="bg-purple-100 text-purple-800 mb-4"
            >
              Our Team
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Expert Physiotherapists
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Dr. Maksudur Rahman",
                role: "Lead Physiotherapist",
                specialization: "Manual Therapy & Sports Rehabilitation",
                experience: "Expert in Evidence-Based Practice",
              },
              {
                name: "Dr. Farhan Ahmed",
                role: "Pediatric Specialist",
                specialization: "Child Development & Movement",
                experience: "Pediatric Physiotherapy Expert",
              },
              {
                name: "Dr. Rafiq Hassan",
                role: "Geriatric Specialist",
                specialization: "Elderly Care & Mobility",
                experience: "Senior Care Specialist",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={`/placeholder.svg?height=300&width=300`}
                        alt={member.name}
                        width={300}
                        height={300}
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
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[#2e3192] font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      {member.specialization}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {member.experience}
                      </Badge>
                      {/* <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#2e3192] hover:text-[#2e3192]"
                        >
                          View Profile
                        </Button>
                      </motion.div> */}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeamSection;
