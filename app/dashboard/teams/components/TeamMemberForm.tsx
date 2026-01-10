"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";
import { X, Upload, Save } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  education: string;
  certifications: string[];
  specialties: string[];
  bio: string;
  email: string;
  phone: string;
  availability: string;
  languages: string;
  image: string;
}

interface TeamMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingMember: TeamMember | null;
  onSuccess: () => void;
}

// API - Upload Image
const API_BASE_URL = "http://localhost:5000/api/team";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const uploadTeamImageAPI = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.imageUrl || data.url;
};

// API - Create Team Member
export interface CreateTeamMemberPayload {
  profileImage: string;
  fullName: string;
  title: string;
  specialization: string;
  experience: string;
  education: string;
  certifications: string[];
  specialties: string[];
  biography: string;
  email: string;
  phone: string;
  availability: string;
  languages: string[];
}

export const createTeamMemberAPI = async (
  payload: CreateTeamMemberPayload
): Promise<any> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create team member");
  }

  return response.json();
};

// API - Update Team Member
export const updateTeamMemberAPI = async (
  id: string,
  payload: CreateTeamMemberPayload
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update team member");
  }

  return response.json();
};

// Component
export default function TeamMemberForm({
  isOpen,
  onClose,
  editingMember,
  onSuccess,
}: TeamMemberFormProps) {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [certificationInput, setCertificationInput] = useState("");
  const [specialtyInput, setSpecialtyInput] = useState("");

  const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
    name: "",
    title: "",
    specialization: "",
    experience: "",
    education: "",
    certifications: [],
    specialties: [],
    bio: "",
    email: "",
    phone: "",
    availability: "",
    languages: "",
    image: "",
  });

  useEffect(() => {
    if (editingMember) {
      setFormData(editingMember);
      setImagePreview(editingMember.image);
    } else {
      resetForm();
    }
  }, [editingMember]);

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
        const imageUrl = await uploadTeamImageAPI(file);
        setFormData({ ...formData, image: imageUrl });
        toast.success("Image uploaded successfully!", { id: uploadToast });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image", { id: uploadToast });
      }
    }
  };

  const addCertification = () => {
    if (certificationInput.trim()) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, certificationInput.trim()],
      });
      setCertificationInput("");
    }
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  const addSpecialty = () => {
    if (specialtyInput.trim()) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialtyInput.trim()],
      });
      setSpecialtyInput("");
    }
  };

  const removeSpecialty = (index: number) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitToast = toast.loading(
      editingMember ? "Updating team member..." : "Adding team member..."
    );

    try {
      const payload = {
        profileImage: formData.image,
        fullName: formData.name,
        title: formData.title,
        specialization: formData.specialization,
        experience: formData.experience,
        education: formData.education,
        certifications: formData.certifications,
        specialties: formData.specialties,
        biography: formData.bio,
        email: formData.email,
        phone: formData.phone,
        availability: formData.availability,
        languages: formData.languages.split(",").map((lang) => lang.trim()),
      };

      if (editingMember) {
        await updateTeamMemberAPI(editingMember.id, payload);
        toast.success("Team member updated successfully!", { id: submitToast });
      } else {
        await createTeamMemberAPI(payload);
        toast.success("Team member added successfully!", { id: submitToast });
      }

      onSuccess();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form", { id: submitToast });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      specialization: "",
      experience: "",
      education: "",
      certifications: [],
      specialties: [],
      bio: "",
      email: "",
      phone: "",
      availability: "",
      languages: "",
      image: "",
    });
    setImagePreview("");
    setCertificationInput("");
    setSpecialtyInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingMember ? "Edit Team Member" : "Add New Team Member"}
          </h2>
          <button
            onClick={onClose}
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
                <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                  <Image
                    src={
                      imagePreview.startsWith("data:")
                        ? imagePreview
                        : `http://localhost:5000${imagePreview}`
                    }
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                <Upload className="h-5 w-5 text-gray-600" />
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

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
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
                placeholder="Lead Physiotherapist"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specialization *
            </label>
            <input
              type="text"
              required
              value={formData.specialization}
              onChange={(e) =>
                setFormData({ ...formData, specialization: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              placeholder="Manual Therapy & Sports Rehabilitation"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience *
              </label>
              <input
                type="text"
                required
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="10+ Years Experience"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Education *
              </label>
              <input
                type="text"
                required
                value={formData.education}
                onChange={(e) =>
                  setFormData({ ...formData, education: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="DPT, Advanced Certification"
              />
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Certifications
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={certificationInput}
                onChange={(e) => setCertificationInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCertification();
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="Add certification"
              />
              <button
                type="button"
                onClick={addCertification}
                className="px-4 py-2 bg-[#2e3192] text-white rounded-lg hover:bg-[#4c46a3] transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg"
                >
                  {cert}
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="hover:text-blue-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specialties
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSpecialty();
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="Add specialty"
              />
              <button
                type="button"
                onClick={addSpecialty}
                className="px-4 py-2 bg-[#2e3192] text-white rounded-lg hover:bg-[#4c46a3] transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-lg"
                >
                  {specialty}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(index)}
                    className="hover:text-purple-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Biography *
            </label>
            <textarea
              required
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              placeholder="Brief biography about the team member..."
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="01234567890"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Availability *
              </label>
              <input
                type="text"
                required
                value={formData.availability}
                onChange={(e) =>
                  setFormData({ ...formData, availability: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="Mon-Sat: 9AM-7PM"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Languages *
              </label>
              <input
                type="text"
                required
                value={formData.languages}
                onChange={(e) =>
                  setFormData({ ...formData, languages: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="Bengali, English"
              />
            </div>
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
              {editingMember ? "Update Member" : "Add Member"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
