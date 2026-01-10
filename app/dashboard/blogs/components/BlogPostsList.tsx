"use client";
import React, { useState, useEffect } from "react";
import BlogPostCard from "./BlogPostCard";

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

interface BlogPostsResponse {
  count: number;
  blogs: BlogPost[];
}

interface BlogPostsListProps {
  onEdit: (blog: BlogPost) => void;
  refreshTrigger: number;
  categoryFilter?: string;
}

// API - Get all blog posts
const API_BASE_URL = "http://localhost:5000/api/blogs";

export const getAllBlogPostsAPI = async (
  categoryId?: string
): Promise<BlogPostsResponse> => {
  const url = categoryId
    ? `${API_BASE_URL}?category=${categoryId}`
    : API_BASE_URL;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  return response.json();
};

// Component
export default function BlogPostsList({
  onEdit,
  refreshTrigger,
  categoryFilter,
}: BlogPostsListProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, [refreshTrigger, categoryFilter]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await getAllBlogPostsAPI(categoryFilter);
      setBlogs(response.blogs);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    fetchBlogs();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading blog posts...</div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-gray-500">
          No blog posts found. Create your first blog post!
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => (
        <BlogPostCard
          key={blog._id}
          blog={blog}
          index={index}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
