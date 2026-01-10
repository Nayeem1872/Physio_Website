"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, Edit, Trash2, Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogCategoriesResponse {
  count: number;
  categories: BlogCategory[];
}

interface BlogCategoriesListProps {
  onEdit: (category: BlogCategory) => void;
  refreshTrigger: number;
  blogCounts: { [key: string]: number };
}

// API - Get all blog categories
const API_BASE_URL = "http://localhost:5000/api/blog-categories";

export const getAllBlogCategoriesAPI = async (): Promise<BlogCategoriesResponse> => {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog categories");
  }

  return response.json();
};

// API - Delete blog category
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const deleteBlogCategoryAPI = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete blog category");
  }

  return response.json();
};

// Component
export default function BlogCategoriesList({
  onEdit,
  refreshTrigger,
  blogCounts,
}: BlogCategoriesListProps) {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<BlogCategory | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [refreshTrigger]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await getAllBlogCategoriesAPI();
      setCategories(response.categories);
    } catch (error) {
      console.error("Error fetching blog categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (category: BlogCategory) => {
    const blogCount = blogCounts[category._id] || 0;
    if (blogCount > 0) {
      toast.error(
        `Cannot delete "${category.name}" because it has ${blogCount} blog post(s). Please reassign or delete those posts first.`
      );
      return;
    }
    setDeletingCategory(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCategory) return;

    setIsDeleting(true);
    try {
      await deleteBlogCategoryAPI(deletingCategory._id);
      toast.success("Category deleted successfully!");
      fetchCategories();
      setShowDeleteModal(false);
      setDeletingCategory(null);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading categories...</div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="col-span-full text-center py-20">
        <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No categories yet
        </h3>
        <p className="text-gray-600 mb-6">
          Create your first category to organize your blog posts
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          const blogCount = blogCounts[category._id] || 0;
          return (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-[#2e3192]/10 to-[#4c46a3]/10 rounded-lg">
                    <Tag className="h-5 w-5 text-[#2e3192]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {blogCount} {blogCount === 1 ? "post" : "posts"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onEdit(category)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteClick(category)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingCategory && (
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
                  Delete Category
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deletingCategory.name}</span>?
              This will permanently remove this category.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingCategory(null);
                }}
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
