import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, X } from "lucide-react";

// Define navigation items outside the component for better practice
const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/book" },
];

const Navbar = () => {
  // State to manage the mobile menu's open/closed status
  const [isOpen, setIsOpen] = useState(false);

  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, staggerChildren: 0.05 },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        // REFINED: Enhanced glassy effect with stronger blur, more transparency, and a subtle border
        className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/" className="flex items-center space-x-3">
                <img
                  src="/images/logo4.png"
                  alt="Reflex Physiotherapy Logo"
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Reflex</h1>
                  <p className="text-xs text-gray-600">
                    Physiotherapy & Rehab Center
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#2e3192] font-medium transition-colors px-3 py-2 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop "Book Appointment" Button */}
            <div className="hidden md:block">
              <motion.div {...scaleOnHover}>
                <Link href="/book">
                  <Button className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192]/90 hover:to-[#4c46a3]/90 shadow-md">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-200/50 transition-colors"
                aria-label="Toggle Menu"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden bg-white/95 backdrop-blur-lg absolute top-full left-0 w-full shadow-lg"
            >
              <div className="container mx-auto flex flex-col items-center px-4 py-8 space-y-4">
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={menuItemVariants}>
                    <Link
                      href={item.href}
                      className="block text-center text-lg text-gray-800 hover:text-[#2e3192] py-2"
                      onClick={() => setIsOpen(false)} // Close menu on click
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={menuItemVariants} className="pt-4">
                  <Link href="/book">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] shadow-lg"
                      onClick={() => setIsOpen(false)} // Close menu on click
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
