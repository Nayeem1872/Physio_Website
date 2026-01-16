"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  Calendar,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";

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

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
  onEdit: (milestone: Milestone) => void;
  onSuccess: () => void;
}

export default function MilestoneCard({
  milestone,
  index,
  onEdit,
  onSuccess,
}: MilestoneCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/milestones/${milestone._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Milestone deleted successfully!");
        onSuccess();
        setShowDeleteModal(false);
      } else {
        toast.error("Failed to delete milestone");
      }
    } catch (error) {
      console.error("Error deleting milestone:", error);
      toast.error("Failed to delete milestone");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/milestones/${milestone._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ published: !milestone.published }),
        }
      );

      if (response.ok) {
        toast.success(
          milestone.published
            ? "Milestone unpublished successfully!"
            : "Milestone published successfully!"
        );
        onSuccess();
      } else {
        toast.error("Failed to update milestone");
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast.error("Failed to update milestone");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative"
      >
        {/* Status Badge */}
        {milestone.published && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              Published
            </span>
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="text-white">
                <p className="text-2xl font-bold">{milestone.year}</p>
                <p className="text-xs text-white/80">
                  Order: {milestone.order}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg flex-1">
              {milestone.title}
            </h3>
            <div className="flex gap-1 ml-2">
              <button
                onClick={handleTogglePublish}
                className={`p-2 rounded-lg transition-colors ${
                  milestone.published
                    ? "bg-green-50 hover:bg-green-100"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                title={milestone.published ? "Published" : "Unpublished"}
              >
                {milestone.published ? (
                  <Eye className="h-4 w-4 text-green-600" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-600" />
                )}
              </button>
              <button
                onClick={() => onEdit(milestone)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4 text-gray-700" />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm">
            {milestone.description}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>
              Created: {new Date(milestone.createdAt).toLocaleDateString()}
            </span>
            <TrendingUp className="h-4 w-4 text-[#2e3192]" />
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
                  Delete Milestone
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the milestone{" "}
              <span className="font-semibold">"{milestone.title}"</span>?
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
                onClick={handleDelete}
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
