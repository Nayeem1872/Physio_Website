"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

// Blog posts data
const blogPosts = [
  {
    id: 1,
    slug: "benefits-of-physiotherapy",
    title: "The Benefits of Regular Physiotherapy Sessions",
    excerpt:
      "Discover how consistent physiotherapy can improve your quality of life, reduce pain, and enhance mobility for long-term wellness.",
    image: "/placeholder.jpg",
    category: "Wellness",
    date: "December 15, 2024",
    readTime: "5 min read",
    author: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    slug: "sports-injury-recovery",
    title: "Sports Injury Recovery: A Complete Guide",
    excerpt:
      "Learn about the most effective techniques and exercises for recovering from common sports injuries and getting back to peak performance.",
    image: "/placeholder.jpg",
    category: "Sports Medicine",
    date: "December 10, 2024",
    readTime: "7 min read",
    author: "Dr. Michael Chen",
  },
  {
    id: 3,
    slug: "posture-correction-tips",
    title: "10 Essential Tips for Better Posture",
    excerpt:
      "Poor posture can lead to chronic pain. Here are practical tips to improve your posture and prevent long-term health issues.",
    image: "/placeholder.jpg",
    category: "Prevention",
    date: "December 5, 2024",
    readTime: "4 min read",
    author: "Dr. Emily Roberts",
  },
  {
    id: 4,
    slug: "back-pain-relief",
    title: "Understanding and Managing Lower Back Pain",
    excerpt:
      "Lower back pain affects millions. Learn about the causes, prevention strategies, and effective treatment options available.",
    image: "/placeholder.jpg",
    category: "Pain Management",
    date: "November 28, 2024",
    readTime: "6 min read",
    author: "Dr. Sarah Johnson",
  },
  {
    id: 5,
    slug: "elderly-mobility",
    title: "Maintaining Mobility in Your Golden Years",
    excerpt:
      "Age doesn't have to limit your movement. Discover exercises and techniques to stay active and independent as you age.",
    image: "/placeholder.jpg",
    category: "Senior Care",
    date: "November 20, 2024",
    readTime: "5 min read",
    author: "Dr. Michael Chen",
  },
  {
    id: 6,
    slug: "rehabilitation-exercises",
    title: "Top 5 Rehabilitation Exercises for Knee Pain",
    excerpt:
      "Strengthen your knees and reduce pain with these evidence-based rehabilitation exercises recommended by physiotherapy experts.",
    image: "/placeholder.jpg",
    category: "Rehabilitation",
    date: "November 15, 2024",
    readTime: "8 min read",
    author: "Dr. Emily Roberts",
  },
];

const categories = [
  "All",
  "Wellness",
  "Sports Medicine",
  "Prevention",
  "Pain Management",
  "Senior Care",
  "Rehabilitation",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2e3192]/10 to-[#4c46a3]/10" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Physiotherapy <span className="text-[#2e3192]">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert advice, tips, and insights on physiotherapy,
              rehabilitation, and wellness
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors bg-white shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2e3192] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#2e3192] transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {post.author}
                      </span>
                      <Button
                        variant="ghost"
                        className="text-[#2e3192] hover:text-[#4c46a3] p-0"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-gray-500">
                No articles found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
