"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { BACKEND_URL } from "@/lib/config";

interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory: BlogCategory | null;
  onSuccess: () => void;
}

// API - Create/Update Blog Category
const API_BASE_URL = `${BACKEND_URL}/api/blog-categories`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createBlogCategoryAPI = async (name: string): Promise<any> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create blog category");
  }

  return response.json();
};

export const updateBlogCategoryAPI = async (
  id: string,
  name: string
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to update blog category");
  }

  return response.json();
};

// Component
export default function BlogCategoryForm({
  isOpen,
  onClose,
  editingCategory,
  onSuccess,
}: BlogCategoryFormProps) {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setCategoryName(editingCategory.name);
    } else {
      setCategoryName("");
    }
  }, [editingCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitToast = toast.loading(
      editingCategory ? "Updating category..." : "Creating category..."
    );

    try {
      if (editingCategory) {
        await updateBlogCategoryAPI(editingCategory._id, categoryName);
        toast.success("Category updated successfully!", { id: submitToast });
      } else {
        await createBlogCategoryAPI(categoryName);
        toast.success("Category created successfully!", { id: submitToast });
      }

      onSuccess();
      setCategoryName("");
      onClose();
    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("Failed to submit category", { id: submitToast });
    }
  };

  const handleCancel = () => {
    setCategoryName("");
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
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        >
          <div className="border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingCategory ? "Edit Category" : "Create New Category"}
            </h2>
            <button
              onClick={handleCancel}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                placeholder="Enter category name"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192]/90 hover:to-[#4c46a3]/90"
              >
                {editingCategory ? "Update Category" : "Create Category"}
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                className="px-8"
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
