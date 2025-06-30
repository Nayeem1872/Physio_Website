import React from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/images/logo.jpg"
                  alt="Reflex Physiotherapy Logo"
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-xl font-bold">Reflex</h3>
                  <p className="text-sm text-gray-400">
                    Physiotherapy & Rehab Center
                  </p>
                </div>
              </motion.div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner in recovery and rehabilitation. Helping you
                move better and live healthier.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  "Manual Therapy",
                  "Sports Rehabilitation",
                  "Post-Surgical Rehab",
                  "Pediatric Care",
                ].map((service) => (
                  <motion.li
                    key={service}
                    whileHover={{ x: 5, color: "#60A5FA" }}
                  >
                    <Link
                      href="/services"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {service}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {["About Us", "Our Team", "Services", "Contact"].map((link) => (
                  <motion.li key={link} whileHover={{ x: 5, color: "#60A5FA" }}>
                    <Link
                      href="#"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>01684522924</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>physiomaksudur24@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>House#17, Road#05, Sector#12, Level#05, Uttara</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          >
            <p>
              &copy; {new Date().getFullYear()} Reflex Physiotherapy & Rehab
              Center. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
