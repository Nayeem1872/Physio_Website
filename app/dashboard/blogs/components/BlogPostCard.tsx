"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
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

interface BlogPostCardProps {
  blog: BlogPost;
  index: number;
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: string) => void;
}

// API - Delete blog post
const API_BASE_URL = `${BACKEND_URL}/api/blogs`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const deleteBlogPostAPI = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete blog post");
  }

  return response.json();
};

// Component
export default function BlogPostCard({
  blog,
  index,
  onEdit,
  onDelete,
}: BlogPostCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteBlogPostAPI(blog._id);
      toast.success("Blog post deleted successfully!");
      onDelete(blog._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast.error("Failed to delete blog post");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryName = () => {
    if (typeof blog.category === "string") {
      return blog.category;
    }
    return blog.category.name;
  };

  const getCategoryId = () => {
    if (typeof blog.category === "string") {
      return blog.category;
    }
    return blog.category._id;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
      >
        {/* Blog Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {blog.imageUrl ? (
            <img
              src={`${BACKEND_URL}${blog.imageUrl}`}
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
              {getCategoryName()}
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
              {formatDate(blog.createdAt)}
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
              onClick={() => window.open(`/blog/${blog._id}`, "_blank")}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() =>
                onEdit({
                  ...blog,
                  category: getCategoryId(),
                })
              }
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:bg-red-50"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Delete Blog Post
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{blog.title}</span>? This will
              permanently remove this blog post.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
