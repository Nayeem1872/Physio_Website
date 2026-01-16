"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Image from "next/image";
import RichTextEditor from "./RichTextEditor";
import { getAllBlogCategoriesAPI } from "./BlogCategoriesList";
import { BACKEND_URL } from "@/lib/config";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string | { _id: string; name: string; slug: string };
  author: string;
  readTime: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPostFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingBlog: BlogPost | null;
  onSuccess: () => void;
}

// API - Create/Update Blog Post
const API_BASE_URL = `${BACKEND_URL}/api/blogs`;
const UPLOAD_API_URL = `${BACKEND_URL}/api/team/upload`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const getAuthHeadersForUpload = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// API - Upload Image
export const uploadImageAPI = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(UPLOAD_API_URL, {
    method: "POST",
    headers: getAuthHeadersForUpload(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.imageUrl || data.url;
};

interface BlogPostPayload {
  title: string;
  slug: string;
  category: string;
  author: string;
  readTime: string;
  imageUrl: string;
  excerpt: string;
  content: string;
}

export const createBlogPostAPI = async (
  payload: BlogPostPayload
): Promise<any> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create blog post");
  }

  return response.json();
};

export const updateBlogPostAPI = async (
  id: string,
  payload: BlogPostPayload
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update blog post");
  }

  return response.json();
};

// Component
export default function BlogPostForm({
  isOpen,
  onClose,
  editingBlog,
  onSuccess,
}: BlogPostFormProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    category: "",
    readTime: "",
    author: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingBlog) {
      const categoryId =
        typeof editingBlog.category === "string"
          ? editingBlog.category
          : editingBlog.category._id;

      setFormData({
        title: editingBlog.title,
        slug: editingBlog.slug,
        excerpt: editingBlog.excerpt,
        content: editingBlog.content,
        imageUrl: editingBlog.imageUrl,
        category: categoryId,
        readTime: editingBlog.readTime,
        author: editingBlog.author,
      });
      setImagePreview(editingBlog.imageUrl);
    } else {
      resetForm();
    }
  }, [editingBlog]);

  const fetchCategories = async () => {
    try {
      const response = await getAllBlogCategoriesAPI();
      setCategories(response.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const uploadToast = toast.loading("Uploading image...");
      try {
        const imageUrl = await uploadImageAPI(file);
        setFormData({ ...formData, imageUrl: imageUrl });
        toast.success("Image uploaded successfully!", { id: uploadToast });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image", { id: uploadToast });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitToast = toast.loading(
      editingBlog ? "Updating blog post..." : "Creating blog post..."
    );

    try {
      const payload: BlogPostPayload = {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        author: formData.author,
        readTime: formData.readTime,
        imageUrl: formData.imageUrl,
        excerpt: formData.excerpt,
        content: formData.content,
      };

      if (editingBlog) {
        await updateBlogPostAPI(editingBlog._id, payload);
        toast.success("Blog post updated successfully!", { id: submitToast });
      } else {
        await createBlogPostAPI(payload);
        toast.success("Blog post created successfully!", { id: submitToast });
      }

      onSuccess();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting blog post:", error);
      toast.error("Failed to submit blog post", { id: submitToast });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      category: "",
      readTime: "",
      author: "",
    });
    setImagePreview("");
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
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
                  Blog Image *
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                      <Image
                        src={
                          imagePreview.startsWith("data:")
                            ? imagePreview
                            : `${BACKEND_URL}${imagePreview}`
                        }
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                    <Upload className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Upload Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
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
                Content *
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Use the toolbar to format your blog content
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
    </AnimatePresence>
  );
}
