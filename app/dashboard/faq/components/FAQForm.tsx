"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save } from "lucide-react";
import toast from "react-hot-toast";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FAQFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingFAQ: FAQ | null;
  onSuccess: () => void;
}

// API
const API_BASE_URL = "http://localhost:5000/api/faqs";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createFAQAPI = async (payload: any): Promise<any> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create FAQ");
  }

  return response.json();
};

export const updateFAQAPI = async (id: string, payload: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update FAQ");
  }

  return response.json();
};

// Component
export default function FAQForm({
  isOpen,
  onClose,
  editingFAQ,
  onSuccess,
}: FAQFormProps) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    order: 1,
    published: true,
  });

  useEffect(() => {
    if (editingFAQ) {
      setFormData({
        question: editingFAQ.question,
        answer: editingFAQ.answer,
        category: editingFAQ.category,
        order: editingFAQ.order,
        published: editingFAQ.published,
      });
    } else {
      resetForm();
    }
  }, [editingFAQ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitToast = toast.loading(
      editingFAQ ? "Updating FAQ..." : "Creating FAQ..."
    );

    try {
      if (editingFAQ) {
        await updateFAQAPI(editingFAQ._id, formData);
        toast.success("FAQ updated successfully!", { id: submitToast });
      } else {
        await createFAQAPI(formData);
        toast.success("FAQ created successfully!", { id: submitToast });
      }

      onSuccess();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting FAQ:", error);
      toast.error("Failed to submit FAQ", { id: submitToast });
    }
  };

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      category: "",
      order: 1,
      published: true,
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
            {editingFAQ ? "Edit FAQ" : "Add New FAQ"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Question *
            </label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              placeholder="What services do you offer?"
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Answer *
            </label>
            <textarea
              required
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              placeholder="We offer a wide range of physiotherapy services..."
            />
          </div>

          {/* Category & Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="General, Services, Pricing, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="1"
              />
            </div>
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
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Publish this FAQ immediately
            </label>
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
              {editingFAQ ? "Update FAQ" : "Add FAQ"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
