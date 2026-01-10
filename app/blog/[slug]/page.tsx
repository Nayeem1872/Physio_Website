"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Calendar, Clock, ArrowLeft, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: { _id: string; name: string; slug: string } | string;
  author: string;
  readTime: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// API - Get blog by ID
const API_BASE_URL = "http://localhost:5000/api/blogs";

const getBlogById = async (id: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("API response not ok:", response.status);
      return null;
    }

    const data = await response.json();
    console.log("API response data:", data);
    
    // Handle both response formats: { blog: {...} } or just {...}
    return data.blog || data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

const getAllBlogs = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const id = params.slug as string; // Using slug param but it's actually the ID
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const blogPost = await getBlogById(id);
      setPost(blogPost);

      if (blogPost) {
        const allBlogs = await getAllBlogs();
        const related = allBlogs
          .filter((b) => b._id !== id)
          .slice(0, 2);
        setRelatedPosts(related);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryName = (category: any) => {
    if (typeof category === "string") {
      return category;
    }
    return category?.name || "Uncategorized";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-gray-500">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-96 overflow-hidden"
      >
        <img
          src={`http://localhost:5000${post.imageUrl}`}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      {/* Article Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 -ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="mb-6">
              <span className="bg-[#2e3192] text-white px-4 py-2 rounded-full text-sm font-medium">
                {getCategoryName(post.category)}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6 pb-6 border-b">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="mb-8"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    url: window.location.href,
                  });
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                lineHeight: "1.8",
              }}
            />
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Continue Reading
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost._id} href={`/blog/${relatedPost._id}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <span className="text-sm text-[#2e3192] font-medium">
                        {getCategoryName(relatedPost.category)}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{formatDate(relatedPost.createdAt)}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.article>
      </div>

      <Footer />

      <style jsx global>{`
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose p {
          color: #4b5563;
          margin-bottom: 1.5rem;
        }
        .prose ul,
        .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
}
