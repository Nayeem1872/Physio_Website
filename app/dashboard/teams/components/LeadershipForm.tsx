"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, Save, User } from "lucide-react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "@/lib/config";

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
}

interface LeadershipFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingLeadership: Leadership | null;
  onSuccess: () => void;
}

export default function LeadershipForm({
  isOpen,
  onClose,
  editingLeadership,
  onSuccess,
}: LeadershipFormProps) {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    role: "chairman" as "chairman" | "ceo" | "other",
    quote: "",
    image: "",
    badge: "",
    icon: "",
    order: 0,
    published: true,
  });

  useEffect(() => {
    if (editingLeadership) {
      setFormData({
        name: editingLeadership.name,
        position: editingLeadership.position,
        role: editingLeadership.role,
        quote: editingLeadership.quote,
        image: editingLeadership.image,
        badge: editingLeadership.badge,
        icon: editingLeadership.icon,
        order: editingLeadership.order,
        published: editingLeadership.published,
      });
      setImagePreview(editingLeadership.image);
    } else {
      resetForm();
    }
  }, [editingLeadership]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const uploadToast = toast.loading("Uploading image...");
      try {
        const token = localStorage.getItem("token");
        const formDataUpload = new FormData();
        formDataUpload.append("image", file);

        const response = await fetch(`${BACKEND_URL}/api/leadership/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataUpload,
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({ ...formData, image: data.imageUrl });
          toast.success("Image uploaded successfully!", { id: uploadToast });
        } else {
          toast.error("Failed to upload image", { id: uploadToast });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image", { id: uploadToast });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitToast = toast.loading(
      editingLeadership ? "Updating leadership..." : "Creating leadership..."
    );

    try {
      const token = localStorage.getItem("token");
      const url = editingLeadership
        ? `${BACKEND_URL}/api/leadership/${editingLeadership._id}`
        : `${BACKEND_URL}/api/leadership`;

      const response = await fetch(url, {
        method: editingLeadership ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          editingLeadership
            ? "Leadership updated successfully!"
            : "Leadership created successfully!",
          { id: submitToast }
        );
        onSuccess();
        resetForm();
        onClose();
      } else {
        toast.error("Failed to submit leadership", { id: submitToast });
      }
    } catch (error) {
      console.error("Error submitting leadership:", error);
      toast.error("Failed to submit leadership", { id: submitToast });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      role: "chairman",
      quote: "",
      image: "",
      badge: "",
      icon: "",
      order: 0,
      published: true,
    });
    setImagePreview("");
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
            {editingLeadership ? "Edit Leadership" : "Add New Leadership"}
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Image
            </label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={
                      imagePreview.startsWith("data:")
                        ? imagePreview
                        : `${BACKEND_URL}${imagePreview}`
                    }
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Upload Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Name & Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="Dr. John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Position *
              </label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="Chairman"
              />
            </div>
          </div>

          {/* Role & Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as "chairman" | "ceo" | "other",
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              >
                <option value="chairman">Chairman</option>
                <option value="ceo">CEO</option>
                <option value="other">Other</option>
              </select>
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

          {/* Badge & Icon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Badge
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) =>
                  setFormData({ ...formData, badge: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="Reflex Physiotherapy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Icon
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="Award"
              />
            </div>
          </div>

          {/* Quote */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quote *
            </label>
            <textarea
              required
              value={formData.quote}
              onChange={(e) =>
                setFormData({ ...formData, quote: e.target.value })
              }
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              placeholder="Enter leadership quote..."
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
              Publish this leadership entry immediately
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
              {editingLeadership ? "Update Leadership" : "Add Leadership"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
