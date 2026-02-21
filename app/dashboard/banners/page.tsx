"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  X,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/config";

interface Banner {
  _id: string;
  section: string;
  images: string[];
  title: string;
  subtitle: string;
  isActive: boolean;
  createdAt: string;
}

export default function BannersManagementPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImagesList, setExistingImagesList] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    section: "hero",
    title: "",
    subtitle: "",
    isActive: true,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch banners on component mount
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/banners`);
      if (response.ok) {
        const data = await response.json();
        // Handle API response format { count: number, banners: Banner[] }
        if (data && Array.isArray(data.banners)) {
          setBanners(data.banners);
        } else if (Array.isArray(data)) {
          setBanners(data);
        } else {
          console.error("Unexpected banner data format:", data);
          setBanners([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      setBanners([]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Check if banner already exists for this section
      const existingBanner = banners.find(
        (b) => b.section === formData.section && b._id !== editingBanner?._id,
      );

      if (existingBanner && !editingBanner) {
        setErrorMessage(
          `A ${formData.section} banner already exists. Please edit or delete the existing one.`,
        );
        setIsLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("section", formData.section);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("isActive", formData.isActive.toString());

      if (editingBanner) {
        formDataToSend.append(
          "existingImages",
          JSON.stringify(existingImagesList),
        );
      }

      // Append multiple images
      selectedFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const url = editingBanner
        ? `${BACKEND_URL}/api/banners/${editingBanner._id}`
        : `${BACKEND_URL}/api/banners`;

      const method = editingBanner ? "PUT" : "POST";

      // Get token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccessMessage(
          editingBanner
            ? "Banner updated successfully!"
            : "Banner created successfully!",
        );
        fetchBanners();
        handleCancel();
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to save banner");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Banner save error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      section: banner.section,
      title: banner.title,
      subtitle: banner.subtitle,
      isActive: banner.isActive,
    });
    setExistingImagesList(banner.images || []);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        const response = await fetch(`${BACKEND_URL}/api/banners/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setSuccessMessage("Banner deleted successfully!");
          fetchBanners();
        } else {
          setErrorMessage("Failed to delete banner");
        }
      } catch (error) {
        setErrorMessage("An error occurred while deleting");
        console.error("Delete error:", error);
      }
    }
  };

  const toggleActive = async (banner: Banner) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();
      formDataToSend.append("section", banner.section);
      formDataToSend.append("title", banner.title);
      formDataToSend.append("subtitle", banner.subtitle);
      formDataToSend.append("isActive", (!banner.isActive).toString());

      const response = await fetch(`${BACKEND_URL}/api/banners/${banner._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        fetchBanners();
      }
    } catch (error) {
      console.error("Toggle active error:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBanner(null);
    setSelectedFiles([]);
    setExistingImagesList([]);
    setFormData({
      section: "hero",
      title: "",
      subtitle: "",
      isActive: true,
    });
  };

  const removeExistingImage = (index: number) => {
    setExistingImagesList((prev) => prev.filter((_, i) => i !== index));
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
      return imagePath;
    }
    const baseUrl = BACKEND_URL || "";
    if (!baseUrl) return imagePath;
    return `${baseUrl}${imagePath}`;
  };

  const heroBanners = banners.filter((b) => b.section === "hero");
  const aboutBanners = banners.filter((b) => b.section === "about");

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Banner Management
              </h1>
              <p className="text-gray-600">
                Manage hero and about section banners (1 per section)
              </p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              disabled={banners.length >= 2}
              className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192]/90 hover:to-[#4c46a3]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Banner
            </Button>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-green-800 text-sm font-medium">
                {successMessage}
              </p>
              <button
                onClick={() => setSuccessMessage("")}
                className="ml-auto text-green-600 hover:text-green-800"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-red-800 text-sm font-medium">{errorMessage}</p>
              <button
                onClick={() => setErrorMessage("")}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* Banner Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={handleCancel}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingBanner ? "Edit Banner" : "Create New Banner"}
                    </h2>
                    <button
                      onClick={handleCancel}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="h-6 w-6 text-gray-600" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section *
                      </label>
                      <select
                        name="section"
                        value={formData.section}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors"
                      >
                        <option value="hero">Hero Section</option>
                        <option value="about">About Section</option>
                      </select>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Welcome to Our Clinic"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Subtitle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtitle *
                      </label>
                      <textarea
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="e.g., Professional Physiotherapy Services"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2e3192] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Current Images (Edit Mode) */}
                    {editingBanner && existingImagesList.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Images ({existingImagesList.length})
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl">
                          {existingImagesList.map((img, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group"
                            >
                              <img
                                src={getImageUrl(img)}
                                alt={`Current ${idx}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://placehold.co/600x400?text=Image+Not+Found";
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => removeExistingImage(idx)}
                                className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Images Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {editingBanner ? "Add New Images" : "Images *"}
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#2e3192] transition-colors">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          required={
                            !editingBanner && existingImagesList.length === 0
                          }
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 mb-1">
                            Click to upload images or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB (multiple files allowed)
                          </p>
                        </label>
                      </div>
                      {selectedFiles.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            New files to upload: {selectedFiles.length}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
                              >
                                <span className="truncate max-w-[150px]">
                                  {file.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedFiles((prev) =>
                                      prev.filter((_, i) => i !== index),
                                    )
                                  }
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Is Active */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="isActive"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded border-gray-300 text-[#2e3192] focus:ring-[#2e3192]"
                      />
                      <label
                        htmlFor="isActive"
                        className="text-sm font-medium text-gray-700"
                      >
                        Active (Display this banner on the website)
                      </label>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192]/90 hover:to-[#4c46a3]/90 py-6"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </span>
                        ) : editingBanner ? (
                          "Update Banner"
                        ) : (
                          "Create Banner"
                        )}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancel}
                        variant="outline"
                        className="px-8 py-6"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Section Banners */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Hero Section Banners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heroBanners.map((banner, index) => (
                <BannerCard
                  key={banner._id}
                  banner={banner}
                  index={index}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleActive={toggleActive}
                />
              ))}
              {heroBanners.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-2">No hero banner yet</p>
                  <p className="text-sm text-gray-400">
                    Click "New Banner" to create one
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* About Section Banners */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About Section Banners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutBanners.map((banner, index) => (
                <BannerCard
                  key={banner._id}
                  banner={banner}
                  index={index}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleActive={toggleActive}
                />
              ))}
              {aboutBanners.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-2">No about banner yet</p>
                  <p className="text-sm text-gray-400">
                    Click "New Banner" to create one
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Banner Card Component
function BannerCard({
  banner,
  index,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  banner: Banner;
  index: number;
  onEdit: (banner: Banner) => void;
  onDelete: (id: string) => void;
  onToggleActive: (banner: Banner) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Reset error state when image changes
  useEffect(() => {
    setImageError(false);
  }, [currentImageIndex, banner.images]);

  // Prepend base URL to image paths
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
      return imagePath;
    }
    // Remove leading slash if BACKEND_URL follows standard of having no traling slash
    // But ensure we don't end up with double slashes if BACKEND_URL is empty
    const baseUrl = BACKEND_URL || "";
    // If baseUrl is empty, we just need the path (which should start with / for public folder)
    if (!baseUrl) return imagePath;

    return `${baseUrl}${imagePath}`;
  };

  const nextImage = () => {
    if (banner.images && banner.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === banner.images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (banner.images && banner.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? banner.images.length - 1 : prev - 1,
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
    >
      {/* Banner Images Carousel */}
      <div className="relative h-48 overflow-hidden bg-gray-100 group">
        {banner.images && banner.images.length > 0 ? (
          <>
            {!imageError ? (
              <img
                src={getImageUrl(banner.images[currentImageIndex])}
                alt={banner.title}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                <span className="text-xs">Image not found</span>
              </div>
            )}

            {/* Carousel Controls */}
            {banner.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
                  {banner.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex
                          ? "bg-white w-4"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                  {currentImageIndex + 1} / {banner.images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-gray-300" />
          </div>
        )}

        <div className="absolute top-4 left-4 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              banner.isActive
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {banner.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Banner Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {banner.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {banner.subtitle}
        </p>

        <div className="text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <span className="capitalize">{banner.section}</span> Section
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onToggleActive(banner)}
          >
            {banner.isActive ? (
              <>
                <EyeOff className="h-4 w-4 mr-1" />
                Hide
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1" />
                Show
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(banner)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:bg-red-50"
            onClick={() => onDelete(banner._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
