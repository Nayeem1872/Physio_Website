"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  AlertTriangle,
  Activity,
  Heart,
  Stethoscope,
  Pill,
  Syringe,
  Thermometer,
  Zap,
  Shield,
  Brain,
  Eye,
  Ear,
  Bone,
  Dumbbell,
  Footprints,
  Hand,
  Smile,
  Baby,
  Users,
  Accessibility,
} from "lucide-react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "@/lib/config";

interface ServiceCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

interface ServiceCategoriesResponse {
  count: number;
  categories: ServiceCategory[];
}

interface ServiceCategoriesListProps {
  onEdit: (category: ServiceCategory) => void;
  refreshTrigger: number;
}

// Icon mapping
const iconMap: { [key: string]: any } = {
  Activity,
  Heart,
  Stethoscope,
  Pill,
  Syringe,
  Thermometer,
  Zap,
  Shield,
  Brain,
  Eye,
  Ear,
  Bone,
  Dumbbell,
  Footprints,
  Hand,
  Smile,
  Baby,
  Users,
  Accessibility,
};

// API
const API_BASE_URL = `${BACKEND_URL}/api/service-categories`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAllServiceCategoriesAPI =
  async (): Promise<ServiceCategoriesResponse> => {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch service categories");
    }

    return response.json();
  };

export const deleteServiceCategoryAPI = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete service category");
  }

  return response.json();
};

// Component
export default function ServiceCategoriesList({
  onEdit,
  refreshTrigger,
}: ServiceCategoriesListProps) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCategory, setDeletingCategory] =
    useState<ServiceCategory | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [refreshTrigger]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await getAllServiceCategoriesAPI();
      setCategories(response.categories);
    } catch (error) {
      console.error("Error fetching service categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (category: ServiceCategory) => {
    setDeletingCategory(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCategory) return;

    setIsDeleting(true);
    try {
      await deleteServiceCategoryAPI(deletingCategory._id);
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
      <div className="text-center py-12">
        <div className="text-gray-500">
          No service categories found. Add your first category!
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          const IconComponent = iconMap[category.icon] || Activity;
          return (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-[#2e3192]/10 to-[#4c46a3]/10 rounded-lg">
                  <IconComponent className="h-8 w-8 text-[#2e3192]" />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(category)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category)}
                    className="p-2 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {category.description}
              </p>
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
