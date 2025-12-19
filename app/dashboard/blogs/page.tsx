"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  User,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export default function BlogsManagementPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    readTime: "",
    author: "",
  });

  const [blogs, setBlogs] = useState<BlogPost[]>([
    {
      id: 1,
      slug: "benefits-of-physiotherapy",
      title: "The Benefits of Regular Physiotherapy Sessions",
      excerpt:
        "Discover how consistent physiotherapy can improve your quality of life, reduce pain, and enhance mobility for long-term wellness.",
      content: `<p>Physiotherapy is more than just treatment for injuries—it's a comprehensive approach to maintaining and improving your overall health and well-being.</p>`,
      image: "/images/logo3.png",
      category: "Wellness",
      date: "December 15, 2024",
      readTime: "5 min read",
      author: "Reflex Physiotherapy Team",
    },
    {
      id: 2,
      slug: "sports-injury-recovery",
      title: "Sports Injury Recovery: A Complete Guide",
      excerpt:
        "Learn about the most effective techniques and exercises for recovering from common sports injuries.",
      content: `<p>Sports injuries can be frustrating and challenging, but with the right approach to recovery, you can return stronger.</p>`,
      image: "/images/logo3.png",
      category: "Sports Medicine",
      date: "December 10, 2024",
      readTime: "7 min read",
      author: "Reflex Physiotherapy Team",
    },
  ]);

  const categories = [
    "Wellness",
    "Sports Medicine",
    "Prevention",
    "Pain Management",
    "Senior Care",
    "Rehabilitation",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({
        ...prev,
        slug: slug,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBlog) {
      // Update existing blog
      setBlogs(
        blogs.map((blog) =>
          blog.id === editingBlog.id
            ? {
                ...blog,
                ...formData,
                date: new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
              }
            : blog
        )
      );
    } else {
      // Add new blog
      const newBlog: BlogPost = {
        id: blogs.length + 1,
        ...formData,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      setBlogs([newBlog, ...blogs]);
    }

    // Reset form
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      readTime: "",
      author: "",
    });
    setShowForm(false);
    setEditingBlog(null);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      readTime: blog.readTime,
      author: blog.author,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      readTime: "",
      author: "",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <DashboardSidebar
              isCollapsed={false}
              setIsCollapsed={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar
          onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Blog Management
              </h1>
              <p className="text-gray-600">Create and manage your blog posts</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192]/90 hover:to-[#4c46a3]/90"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Blog Post
            </Button>
          </div>

          {/* Blog Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={handleCancel}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                    </h2>
                    <button
                      onClick={handleCancel}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="h-6 w-6 text-gray-600" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter blog title"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug (URL) *
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        required
                        placeholder="blog-post-url"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Auto-generated from title, but you can edit it
                      </p>
                    </div>

                    {/* Category & Author Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors"
                        >
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Author *
                        </label>
                        <input
                          type="text"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          required
                          placeholder="Author name"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Read Time & Image Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Read Time *
                        </label>
                        <input
                          type="text"
                          name="readTime"
                          value={formData.readTime}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., 5 min read"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL *
                        </label>
                        <input
                          type="text"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          required
                          placeholder="/images/blog-image.jpg"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt *
                      </label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="Brief description of the blog post (shown in cards)"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content (HTML) *
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        rows={12}
                        placeholder="Full blog content with HTML tags (e.g., <p>, <h2>, etc.)"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors resize-none font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Use HTML tags for formatting: &lt;p&gt;, &lt;h2&gt;,
                        &lt;ul&gt;, &lt;li&gt;, etc.
                      </p>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192]/90 hover:to-[#4c46a3]/90 py-6"
                      >
                        {editingBlog ? "Update Blog Post" : "Create Blog Post"}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancel}
                        variant="outline"
                        className="px-8 py-6"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
              >
                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#2e3192] text-white px-3 py-1 rounded-full text-xs font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {blog.readTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <User className="h-3 w-3" />
                    <span>{blog.author}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        window.open(`/blog/${blog.slug}`, "_blank")
                      }
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(blog)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {blogs.length === 0 && (
            <div className="text-center py-20">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No blog posts yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first blog post to get started
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3]"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Blog Post
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
