"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save, Activity, Heart, Stethoscope, Pill, Syringe, Thermometer, Zap, Shield, Brain, Eye, Ear, Bone, Dumbbell, Footprints, Hand, Smile, Baby, Users, Accessibility } from "lucide-react";
import toast from "react-hot-toast";

interface ServiceCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

interface ServiceCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory: ServiceCategory | null;
  onSuccess: () => void;
}

// Medical icons from Lucide React
const medicalIcons = [
  { name: "Activity", icon: Activity, value: "Activity" },
  { name: "Heart", icon: Heart, value: "Heart" },
  { name: "Stethoscope", icon: Stethoscope, value: "Stethoscope" },
  { name: "Pill", icon: Pill, value: "Pill" },
  { name: "Syringe", icon: Syringe, value: "Syringe" },
  { name: "Thermometer", icon: Thermometer, value: "Thermometer" },
  { name: "Zap", icon: Zap, value: "Zap" },
  { name: "Shield", icon: Shield, value: "Shield" },
  { name: "Brain", icon: Brain, value: "Brain" },
  { name: "Eye", icon: Eye, value: "Eye" },
  { name: "Ear", icon: Ear, value: "Ear" },
  { name: "Bone", icon: Bone, value: "Bone" },
  { name: "Dumbbell", icon: Dumbbell, value: "Dumbbell" },
  { name: "Footprints", icon: Footprints, value: "Footprints" },
  { name: "Hand", icon: Hand, value: "Hand" },
  { name: "Smile", icon: Smile, value: "Smile" },
  { name: "Baby", icon: Baby, value: "Baby" },
  { name: "Users", icon: Users, value: "Users" },
  { name: "Accessibility", icon: Accessibility, value: "Accessibility" },
];

// API
const API_BASE_URL = "http://localhost:5000/api/service-categories";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createServiceCategoryAPI = async (payload: any): Promise<any> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create service category");
  }

  return response.json();
};

export const updateServiceCategoryAPI = async (
  id: string,
  payload: any
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update service category");
  }

  return response.json();
};

// Component
export default function ServiceCategoryForm({
  isOpen,
  onClose,
  editingCategory,
  onSuccess,
}: ServiceCategoryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "Activity",
  });

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description,
        icon: editingCategory.icon,
      });
    } else {
      resetForm();
    }
  }, [editingCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitToast = toast.loading(
      editingCategory ? "Updating category..." : "Creating category..."
    );

    try {
      if (editingCategory) {
        await updateServiceCategoryAPI(editingCategory._id, formData);
        toast.success("Category updated successfully!", { id: submitToast });
      } else {
        await createServiceCategoryAPI(formData);
        toast.success("Category created successfully!", { id: submitToast });
      }

      onSuccess();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("Failed to submit category", { id: submitToast });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "Activity",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingCategory ? "Edit Service Category" : "Add New Service Category"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              placeholder="Manual Therapy"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              placeholder="Brief description of the service category..."
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Icon *
            </label>
            <div className="grid grid-cols-5 md:grid-cols-7 gap-3">
              {medicalIcons.map((iconItem) => {
                const IconComponent = iconItem.icon;
                const isSelected = formData.icon === iconItem.value;
                return (
                  <button
                    key={iconItem.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, icon: iconItem.value })
                    }
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                      isSelected
                        ? "border-[#2e3192] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    title={iconItem.name}
                  >
                    <IconComponent
                      className={`h-6 w-6 mx-auto ${
                        isSelected ? "text-[#2e3192]" : "text-gray-600"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected: {formData.icon}
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Save className="h-5 w-5" />
              {editingCategory ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
