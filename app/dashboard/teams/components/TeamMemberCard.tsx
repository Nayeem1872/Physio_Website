"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Edit,
  Trash2,
  Mail,
  Phone,
  Clock,
  Globe,
  Award,
  GraduationCap,
  Briefcase,
  AlertTriangle,
} from "lucide-react";

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

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}

// API - Delete team member
const API_BASE_URL = "http://localhost:5000/api/team";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const deleteTeamMemberAPI = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete team member");
  }

  return response.json();
};

// Component
export default function TeamMemberCard({
  member,
  index,
  onEdit,
  onDelete,
}: TeamMemberCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteTeamMemberAPI(member.id);
      toast.success("Team member deleted successfully!");
      onDelete(member.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Failed to delete team member");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Member Image */}
      <div className="relative h-48 bg-gradient-to-r from-[#2e3192] to-[#4c46a3]">
        <Image
          src={`http://localhost:5000${member.image}`}
          alt={member.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => onEdit(member)}
            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          >
            <Edit className="h-4 w-4 text-gray-700" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 bg-white rounded-lg shadow-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      </div>

      {/* Member Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-[#2e3192] font-semibold mb-2">{member.title}</p>
        <p className="text-sm text-gray-600 mb-4">{member.specialization}</p>

        {/* Experience & Education */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2">
            <Briefcase className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Experience</p>
              <p className="text-sm text-gray-900">{member.experience}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <GraduationCap className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Education</p>
              <p className="text-sm text-gray-900">{member.education}</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-gray-400" />
            <p className="text-xs text-gray-500 font-semibold">
              Certifications
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {member.certifications.slice(0, 3).map((cert, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
              >
                {cert}
              </span>
            ))}
            {member.certifications.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                +{member.certifications.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{member.availability}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Globe className="h-4 w-4 text-gray-400" />
            <span>{member.languages}</span>
          </div>
        </div>
      </div>

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
                  Delete Team Member
                </h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <span className="font-semibold">{member.name}</span>? 
              This will permanently remove them from your team.
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
    </motion.div>
  );
}
