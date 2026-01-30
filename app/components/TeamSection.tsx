"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BACKEND_URL } from "@/lib/config";

interface TeamMember {
  _id: string;
  profileImage: string;
  fullName: string;
  title: string;
  specialization: string;
  experience: string;
  education: string;
  certifications: string[];
  specialties: string[];
  biography: string;
  email: string;
  phone: string;
  availability: string;
  languages: string[];
}

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoize animation variants
  const fadeInUp = useMemo(() => ({
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }), []);

  const staggerContainer = useMemo(() => ({
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }), []);

  // Optimized fetch function
  const fetchTeamMembers = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/team`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      // Only show first 3 members, sorted by order
      const sortedMembers = (data.teamMembers || [])
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
        .slice(0, 3);

      setTeamMembers(sortedMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setTeamMembers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  if (loading) {
    return (
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </section>
    );
  }

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
            <Badge className="bg-[#2e3192] text-white hover:bg-[#1a1c3d] mb-4 py-1.5 px-6 rounded-full text-sm font-semibold tracking-wide shadow-lg shadow-blue-900/10">
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member._id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group h-full"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={`${BACKEND_URL}${member.profileImage}`}
                        alt={member.fullName}
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
                  <CardContent className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {member.fullName}
                    </h3>
                    <p className="text-[#2e3192] font-medium mb-2">
                      {member.title}
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
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/team">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#252a7a] hover:to-[#3d3d8a] text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                View All Team Members
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeamSection;
