"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Clock,
  Globe,
  Award,
  GraduationCap,
  Briefcase,
  X,
  Upload,
  Save,
} from "lucide-react";
import Image from "next/image";

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

export default function TeamsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Sample data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Dr. Maksudur Rahman",
      title: "Lead Physiotherapist & Founder",
      specialization: "Manual Therapy & Sports Rehabilitation",
      experience: "Expert in Evidence-Based Practice",
      education: "DPT, Advanced Manual Therapy Certification",
      certifications: [
        "Manual Therapy Certified",
        "Sports Specialist",
        "Dry Needling",
        "Evidence-Based Practice",
      ],
      specialties: [
        "Manual Therapy Techniques",
        "Sports Injury Rehabilitation",
        "Dry Needling",
        "Joint Mobilization",
        "Soft Tissue Manipulation",
        "Exercise Prescription",
      ],
      bio: "Dr. Maksudur founded Reflex Physiotherapy with a passion for providing comprehensive, patient-centered care. He specializes in manual therapy and sports rehabilitation using evidence-based approaches. His expertise in advanced manual therapy techniques and commitment to individualized treatment plans has helped numerous patients in Uttara recover from various musculoskeletal conditions.",
      email: "physiomaksudur24@gmail.com",
      phone: "01684522924",
      availability: "Mon-Sat: 9AM-7PM",
      languages: "Bengali, English",
      image: "/placeholder-user.jpg",
    },
  ]);

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

  const [certificationInput, setCertificationInput] = useState("");
  const [specialtyInput, setSpecialtyInput] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMember) {
      // Update existing member
      setTeamMembers(
        teamMembers.map((member) =>
          member.id === editingMember.id
            ? { ...formData, id: editingMember.id }
            : member
        )
      );
    } else {
      // Add new member
      const newMember: TeamMember = {
        ...formData,
        id: Date.now().toString(),
      };
      setTeamMembers([...teamMembers, newMember]);
    }

    resetForm();
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
    setIsFormOpen(false);
    setEditingMember(null);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData(member);
    setImagePreview(member.image);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <DashboardSidebar
              isCollapsed={false}
              setIsCollapsed={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar
          onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Team Management
              </h1>
              <p className="text-gray-600">
                Manage your physiotherapy team members
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Team Member
            </motion.button>
          </motion.div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* Member Image */}
                <div className="relative h-48 bg-gradient-to-r from-[#2e3192] to-[#4c46a3]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit className="h-4 w-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 bg-white rounded-lg shadow-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#2e3192] font-semibold mb-2">
                    {member.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {member.specialization}
                  </p>

                  {/* Experience & Education */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <Briefcase className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Experience</p>
                        <p className="text-sm text-gray-900">
                          {member.experience}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Education</p>
                        <p className="text-sm text-gray-900">
                          {member.education}
                        </p>
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
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
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
                onClick={resetForm}
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
                        src={imagePreview}
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
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
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
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
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
                  onClick={resetForm}
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
      )}
    </div>
  );
}
