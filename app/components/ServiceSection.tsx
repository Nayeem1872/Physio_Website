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
  Link,
  Shield,
  Target,
  UserCheck,
  Zap,
} from "lucide-react";

const ServiceSection = () => {
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
                title: "Manual Therapy",
                description:
                  "Hands-on approach using joint mobilization, soft tissue work, and massage to reduce pain and improve mobility.",
                color: "from-[#2e3192] to-[#4c46a3]",
              },
              {
                icon: Activity,
                title: "Sports Rehabilitation",
                description:
                  "Specialized therapy for musculoskeletal injuries using exercise, movement, and therapeutic interventions.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Shield,
                title: "Post-Surgical Rehabilitation",
                description:
                  "Structured program to regain strength, mobility, and function after surgery with healing support.",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Baby,
                title: "Pediatric Physiotherapy",
                description:
                  "Specialized care for children from birth to 19 years, focusing on optimal physical development.",
                color: "from-pink-500 to-pink-600",
              },
              {
                icon: UserCheck,
                title: "Geriatric Physiotherapy",
                description:
                  "Specialized care for older adults addressing age-related conditions and maintaining quality of life.",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: Zap,
                title: "Dry Needling & Electrotherapy",
                description:
                  "Advanced techniques using needles and electrical currents to relieve pain and improve movement.",
                color: "from-red-500 to-red-600",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-[#2e3192] transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <motion.div
                      className="mt-6 text-center"
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        href="/services"
                        className="text-[#2e3192] font-medium inline-flex items-center hover:text-[#2e3192]"
                      >
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </motion.div>
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

export default ServiceSection;
