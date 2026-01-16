"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  Award,
  Quote,
} from "lucide-react";
import toast from "react-hot-toast";

interface Leadership {
  _id: string;
  name: string;
  position: string;
  role: "chairman" | "ceo" | "other";
  quote: string;
  image: string;
  badge: string;
  icon: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LeadershipCardProps {
  leadership: Leadership;
  index: number;
  onEdit: (leadership: Leadership) => void;
  onSuccess: () => void;
}

export default function LeadershipCard({
  leadership,
  index,
  onEdit,
  onSuccess,
}: LeadershipCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/leadership/${leadership._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Leadership entry deleted successfully!");
        onSuccess();
        setShowDeleteModal(false);
      } else {
        toast.error("Failed to delete leadership entry");
      }
    } catch (error) {
      console.error("Error deleting leadership:", error);
      toast.error("Failed to delete leadership entry");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/leadership/${leadership._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ published: !leadership.published }),
        }
      );

      if (response.ok) {
        toast.success(
          leadership.published
            ? "Leadership entry unpublished!"
            : "Leadership entry published!"
        );
        onSuccess();
      } else {
        toast.error("Failed to update leadership entry");
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast.error("Failed to update leadership entry");
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "chairman":
        return "from-[#2e3192] to-[#4c46a3]";
      case "ceo":
        return "from-green-500 to-green-600";
      default:
        return "from-purple-500 to-purple-600";
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
        {leadership.published && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              Published
            </span>
          </div>
        )}

        {/* Order Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold rounded-full shadow-md border border-gray-200">
            Order: {leadership.order}
          </span>
        </div>

        {/* Header */}
        <div
          className={`bg-gradient-to-r ${getRoleColor(leadership.role)} p-6`}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={`http://localhost:5000${leadership.image}`}
                alt={leadership.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-white flex-1">
              <h3 className="text-xl font-bold">{leadership.name}</h3>
              <p className="text-sm text-white/90">{leadership.position}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                {leadership.badge || leadership.role.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Quote className="h-5 w-5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Quote
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                "{leadership.quote}"
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award className="h-4 w-4" />
              <span>Order: {leadership.order}</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={handleTogglePublish}
                className={`p-2 rounded-lg transition-colors ${
                  leadership.published
                    ? "bg-green-50 hover:bg-green-100"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                title={leadership.published ? "Published" : "Unpublished"}
              >
                {leadership.published ? (
                  <Eye className="h-4 w-4 text-green-600" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-600" />
                )}
              </button>
              <button
                onClick={() => onEdit(leadership)}
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
                  Delete Leadership Entry
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{leadership.name}</span>?
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
