"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Star,
  Quote,
  User,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  testimonial: string;
  service: string;
  date: string;
  isPublished: boolean;
}

export default function TestimonialsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "unpublished">("all");

  // Sample data
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      name: "Sarah Ahmed",
      role: "Office Worker",
      image: "/placeholder-user.jpg",
      rating: 5,
      testimonial:
        "Dr. Maksudur's manual therapy treatment completely transformed my chronic back pain. After just 6 sessions, I can now work comfortably at my desk without any discomfort. His expertise and caring approach made all the difference!",
      service: "Manual Therapy",
      date: "2024-01-15",
      isPublished: true,
    },
    {
      id: "2",
      name: "Karim Rahman",
      role: "Professional Athlete",
      image: "/placeholder-user.jpg",
      rating: 5,
      testimonial:
        "Outstanding sports rehabilitation program! The team helped me recover from a severe knee injury and get back to competitive sports faster than I expected. Highly professional and results-driven.",
      service: "Sports Rehabilitation",
      date: "2024-01-10",
      isPublished: true,
    },
    {
      id: "3",
      name: "Fatima Khan",
      role: "Teacher",
      image: "/placeholder-user.jpg",
      rating: 4,
      testimonial:
        "Excellent physiotherapy services. The staff is very knowledgeable and the treatment plans are personalized. I've seen significant improvement in my shoulder mobility.",
      service: "Joint Mobilization",
      date: "2024-01-08",
      isPublished: false,
    },
  ]);

  const [formData, setFormData] = useState<Omit<Testimonial, "id">>({
    name: "",
    role: "",
    image: "",
    rating: 5,
    testimonial: "",
    service: "",
    date: new Date().toISOString().split("T")[0],
    isPublished: true,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTestimonial) {
      // Update existing testimonial
      setTestimonials(
        testimonials.map((testimonial) =>
          testimonial.id === editingTestimonial.id
            ? { ...formData, id: editingTestimonial.id }
            : testimonial
        )
      );
    } else {
      // Add new testimonial
      const newTestimonial: Testimonial = {
        ...formData,
        id: Date.now().toString(),
      };
      setTestimonials([...testimonials, newTestimonial]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      image: "",
      rating: 5,
      testimonial: "",
      service: "",
      date: new Date().toISOString().split("T")[0],
      isPublished: true,
    });
    setImagePreview("");
    setIsFormOpen(false);
    setEditingTestimonial(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setImagePreview(testimonial.image);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));
    }
  };

  const togglePublishStatus = (id: string) => {
    setTestimonials(
      testimonials.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, isPublished: !testimonial.isPublished }
          : testimonial
      )
    );
  };

  // Filter testimonials
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (filterStatus === "published") return testimonial.isPublished;
    if (filterStatus === "unpublished") return !testimonial.isPublished;
    return true;
  });

  // Stats
  const stats = {
    total: testimonials.length,
    published: testimonials.filter((t) => t.isPublished).length,
    unpublished: testimonials.filter((t) => !t.isPublished).length,
    avgRating: (
      testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
    ).toFixed(1),
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
                Testimonials Management
              </h1>
              <p className="text-gray-600">
                Manage patient reviews and testimonials
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Testimonial
            </motion.button>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Quote className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.unpublished}</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === "all"
                    ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilterStatus("published")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === "published"
                    ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Published ({stats.published})
              </button>
              <button
                onClick={() => setFilterStatus("unpublished")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === "unpublished"
                    ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Pending ({stats.unpublished})
              </button>
            </div>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-[#2e3192] to-[#4c46a3]">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => togglePublishStatus(testimonial.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          testimonial.isPublished
                            ? "bg-green-50 hover:bg-green-100"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        title={testimonial.isPublished ? "Published" : "Unpublished"}
                      >
                        {testimonial.isPublished ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-600" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="p-2 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#2e3192] opacity-20" />
                    <p className="text-gray-700 leading-relaxed pl-6">
                      {testimonial.testimonial}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Service</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {testimonial.service}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(testimonial.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                {testimonial.isPublished && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Published
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTestimonials.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Quote className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No testimonials found
              </h3>
              <p className="text-gray-600 mb-6">
                {filterStatus === "all"
                  ? "Get started by adding your first testimonial"
                  : `No ${filterStatus} testimonials`}
              </p>
              {filterStatus === "all" && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Add Your First Testimonial
                </button>
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
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
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={imagePreview}
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

              {/* Name & Role */}
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
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role/Occupation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                    placeholder="Office Worker"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= formData.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating} star{formData.rating !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Testimonial Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Testimonial *
                </label>
                <textarea
                  required
                  value={formData.testimonial}
                  onChange={(e) =>
                    setFormData({ ...formData, testimonial: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                  placeholder="Write the testimonial here..."
                />
              </div>

              {/* Service & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                    placeholder="Manual Therapy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Publish Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: e.target.checked })
                  }
                  className="w-5 h-5 text-[#2e3192] border-gray-300 rounded focus:ring-[#2e3192]"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                  Publish this testimonial immediately
                </label>
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
                  {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
