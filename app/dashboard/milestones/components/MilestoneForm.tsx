"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save } from "lucide-react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "@/lib/config";

interface Milestone {
  _id: string;
  year: string;
  title: string;
  description: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MilestoneFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingMilestone: Milestone | null;
  onSuccess: () => void;
}

export default function MilestoneForm({
  isOpen,
  onClose,
  editingMilestone,
  onSuccess,
}: MilestoneFormProps) {
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    description: "",
    order: 0,
    published: true,
  });

  useEffect(() => {
    if (editingMilestone) {
      setFormData({
        year: editingMilestone.year,
        title: editingMilestone.title,
        description: editingMilestone.description,
        order: editingMilestone.order,
        published: editingMilestone.published,
      });
    } else {
      resetForm();
    }
  }, [editingMilestone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitToast = toast.loading(
      editingMilestone ? "Updating milestone..." : "Creating milestone..."
    );

    try {
      const token = localStorage.getItem("token");
      const url = editingMilestone
        ? `${BACKEND_URL}/api/milestones/${editingMilestone._id}`
        : `${BACKEND_URL}/api/milestones`;

      const response = await fetch(url, {
        method: editingMilestone ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          editingMilestone
            ? "Milestone updated successfully!"
            : "Milestone created successfully!",
          { id: submitToast }
        );
        onSuccess();
        resetForm();
        onClose();
      } else {
        toast.error("Failed to submit milestone", { id: submitToast });
      }
    } catch (error) {
      console.error("Error submitting milestone:", error);
      toast.error("Failed to submit milestone", { id: submitToast });
    }
  };

  const resetForm = () => {
    setFormData({
      year: "",
      title: "",
      description: "",
      order: 0,
      published: true,
    });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
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
            {editingMilestone ? "Edit Milestone" : "Add New Milestone"}
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Year & Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="2024"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order *
              </label>
              <input
                type="number"
                required
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              placeholder="Reflex Physiotherapy Founded"
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
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              placeholder="Describe the milestone achievement..."
            />
          </div>

          {/* Publish Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="w-5 h-5 text-[#2e3192] border-gray-300 rounded focus:ring-[#2e3192]"
            />
            <label
              htmlFor="published"
              className="text-sm font-medium text-gray-700"
            >
              Publish this milestone immediately
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Save className="h-5 w-5" />
              {editingMilestone ? "Update Milestone" : "Add Milestone"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
