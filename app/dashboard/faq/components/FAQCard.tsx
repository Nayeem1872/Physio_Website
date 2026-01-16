"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/config"; from "lucide-react";
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

interface FAQCardProps {
  faq: FAQ;
  index: number;
  onEdit: (faq: FAQ) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

// API - Delete FAQ
const API_BASE_URL = `${BACKEND_URL}/api/faqs`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const deleteFAQAPI = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete FAQ");
  }

  return response.json();
};

// API - Toggle publish status
export const togglePublishFAQAPI = async (
  id: string,
  published: boolean
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ published }),
  });

  if (!response.ok) {
    throw new Error("Failed to update FAQ");
  }

  return response.json();
};

// Component
export default function FAQCard({
  faq,
  index,
  onEdit,
  onDelete,
  onTogglePublish,
}: FAQCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteFAQAPI(faq._id);
      toast.success("FAQ deleted successfully!");
      onDelete(faq._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async () => {
    try {
      await togglePublishFAQAPI(faq._id, !faq.published);
      toast.success(
        faq.published
          ? "FAQ unpublished successfully!"
          : "FAQ published successfully!"
      );
      onTogglePublish(faq._id);
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast.error("Failed to update FAQ");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                  {faq.category}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                  Order: {faq.order}
                </span>
                {faq.published && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Published
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="flex-1">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                      isExpanded ? "transform rotate-180" : ""
                    }`}
                  />
                </h3>
              </button>
            </div>
          </div>

          {/* Answer (Expandable) */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 pb-4 border-b border-gray-100"
            >
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleTogglePublish}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                faq.published
                  ? "bg-green-50 hover:bg-green-100 text-green-700"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {faq.published ? (
                <>
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">Published</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4" />
                  <span className="text-sm font-medium">Unpublished</span>
                </>
              )}
            </button>
            <button
              onClick={() => onEdit(faq)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-3 py-2 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
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
                <h3 className="text-xl font-bold text-gray-900">Delete FAQ</h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this FAQ?
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
