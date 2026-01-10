"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Clock,
  DollarSign,
  CheckCircle,
  Folder,
  Briefcase,
  Tag,
  List,
  AlertTriangle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import ServiceCategoriesList from "./components/ServiceCategoriesList";
import ServiceCategoryForm from "./components/ServiceCategoryForm";
import {
  getAllServicesAPI,
  createServiceAPI,
  updateServiceAPI,
  deleteServiceAPI,
  CreateServicePayload,
} from "./api/servicesApi";
import { getAllServiceCategoriesAPI } from "./components/ServiceCategoriesList";

interface ServiceCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  _id: string;
  category: string | { _id: string; name: string; slug: string; description: string; icon: string };
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  keyBenefits: string[];
  duration: string;
  pricing: string;
  imageUrl?: string;
  published: boolean;
}

export default function ServicesPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"categories" | "services">("categories");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [refreshCategoriesTrigger, setRefreshCategoriesTrigger] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingService, setDeletingService] = useState<Service | null>(null);

  const [formData, setFormData] = useState<Partial<Omit<Service, 'category'> & { category: string }>>({
    category: "",
    name: "",
    slug: "",
    shortDescription: "",
    detailedDescription: "",
    keyBenefits: [],
    duration: "",
    pricing: "",
    imageUrl: "",
    published: true,
  });

  const [benefitInput, setBenefitInput] = useState("");

  // Fetch services and categories on mount
  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await getAllServicesAPI(undefined, true);
      setServices(response.services);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllServiceCategoriesAPI();
      setCategories(response.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Get category names for filter
  const categoryNames = ["All", ...categories.map((c) => c.name)];

  // Filter services by category
  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => {
          // Handle both populated and non-populated category
          const categoryId = typeof s.category === 'object' ? s.category._id : s.category;
          const category = categories.find((c) => c._id === categoryId);
          return category?.name === selectedCategory;
        });

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormData({
        ...formData,
        keyBenefits: [...(formData.keyBenefits || []), benefitInput.trim()],
      });
      setBenefitInput("");
    }
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      keyBenefits: (formData.keyBenefits || []).filter((_, i) => i !== index),
    });
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitToast = toast.loading(
      editingService ? "Updating service..." : "Creating service..."
    );

    try {
      const payload: CreateServicePayload = {
        category: formData.category!,
        name: formData.name!,
        slug: formData.slug || generateSlug(formData.name!),
        shortDescription: formData.shortDescription!,
        detailedDescription: formData.detailedDescription!,
        keyBenefits: formData.keyBenefits || [],
        duration: formData.duration!,
        pricing: formData.pricing!,
        imageUrl: formData.imageUrl,
        published: formData.published ?? true,
      };

      if (editingService) {
        await updateServiceAPI(editingService._id, payload);
        toast.success("Service updated successfully!", { id: submitToast });
      } else {
        await createServiceAPI(payload);
        toast.success("Service created successfully!", { id: submitToast });
      }

      await fetchServices();
      resetForm();
    } catch (error: any) {
      console.error("Error submitting service:", error);
      toast.error(error.message || "Failed to submit service", {
        id: submitToast,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      category: "",
      name: "",
      slug: "",
      shortDescription: "",
      detailedDescription: "",
      keyBenefits: [],
      duration: "",
      pricing: "",
      imageUrl: "",
      published: true,
    });
    setBenefitInput("");
    setIsFormOpen(false);
    setEditingService(null);
  };

  const handleEdit = (service: any) => {
    // Handle both populated and non-populated category field
    const categoryId = typeof service.category === 'object' 
      ? service.category._id 
      : service.category;
    
    setEditingService(service);
    setFormData({
      ...service,
      category: categoryId,
    });
    setIsFormOpen(true);
  };

  const handleDeleteClick = (service: Service) => {
    setDeletingService(service);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingService) return;

    const deleteToast = toast.loading("Deleting service...");

    try {
      await deleteServiceAPI(deletingService._id);
      toast.success("Service deleted successfully!", { id: deleteToast });
      await fetchServices();
      setShowDeleteModal(false);
      setDeletingService(null);
    } catch (error: any) {
      console.error("Error deleting service:", error);
      toast.error(error.message || "Failed to delete service", {
        id: deleteToast,
      });
    }
  };

  const handleEditCategory = (category: ServiceCategory) => {
    setEditingCategory(category);
    setIsCategoryFormOpen(true);
  };

  const handleCategorySuccess = () => {
    setRefreshCategoriesTrigger((prev) => prev + 1);
    fetchCategories();
  };

  const handleCloseCategoryForm = () => {
    setIsCategoryFormOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
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
                Services Management
              </h1>
              <p className="text-gray-600">
                Manage your physiotherapy services and categories
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                activeTab === "categories"
                  ? setIsCategoryFormOpen(true)
                  : setIsFormOpen(true)
              }
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5" />
              {activeTab === "categories" ? "Add Category" : "Add Service"}
            </motion.button>
          </motion.div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("categories")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "categories"
                      ? "border-[#2e3192] text-[#2e3192]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Tag className="h-5 w-5 inline-block mr-2" />
                  Service Categories
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "services"
                      ? "border-[#2e3192] text-[#2e3192]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <List className="h-5 w-5 inline-block mr-2" />
                  Services
                </button>
              </nav>
            </div>
          </div>

          {/* Categories Tab Content */}
          {activeTab === "categories" && (
            <ServiceCategoriesList
              onEdit={handleEditCategory}
              refreshTrigger={refreshCategoriesTrigger}
            />
          )}

          {/* Services Tab Content */}
          {activeTab === "services" && (
            <>
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  {categoryNames.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">Loading services...</div>
                </div>
              )}

              {/* Services Grid */}
              {!isLoading && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredServices.map((service, index) => {
                    // Handle both populated and non-populated category
                    const categoryId = typeof service.category === 'object' 
                      ? service.category._id 
                      : service.category;
                    const categoryName = typeof service.category === 'object'
                      ? service.category.name
                      : categories.find((c) => c._id === categoryId)?.name || "Uncategorized";
                    
                    return (
                      <motion.div
                        key={service._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                      >
                        {/* Service Header */}
                        <div className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] p-6 text-white">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <Briefcase className="h-6 w-6" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Folder className="h-4 w-4" />
                                  <span className="text-sm opacity-90">
                                    {categoryName}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold">{service.name}</h3>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(service)}
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(service)}
                                className="p-2 bg-white/20 hover:bg-red-500 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm opacity-90">{service.shortDescription}</p>
                        </div>

                        {/* Service Body */}
                        <div className="p-6">
                          {/* Detailed Description */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                              About This Service
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {service.detailedDescription}
                            </p>
                          </div>

                          {/* Benefits */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">
                              Key Benefits
                            </h4>
                            <div className="space-y-2">
                              {service.keyBenefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-gray-700">
                                    {benefit}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Duration & Pricing */}
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Clock className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Duration</p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {service.duration}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Pricing</p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {service.pricing}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No services found
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedCategory === "All"
                  ? "Get started by adding your first service"
                  : `No services in "${selectedCategory}" category`}
              </p>
              {selectedCategory === "All" && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Add Your First Service
                </button>
              )}
            </motion.div>
          )}
            </>
          )}
        </main>
      </div>

      {/* Service Category Form Modal */}
      <ServiceCategoryForm
        isOpen={isCategoryFormOpen}
        onClose={handleCloseCategoryForm}
        editingCategory={editingCategory}
        onSuccess={handleCategorySuccess}
      />

      {/* Delete Service Confirmation Modal */}
      {showDeleteModal && deletingService && (
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
                  Delete Service
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deletingService.name}</span>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingService(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add/Edit Service Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Category & Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Category *
                  </label>
                  <select
                    required
                    value={typeof formData.category === 'string' ? formData.category : ''}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                    placeholder="Manual Therapy"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDescription: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                  placeholder="Hands-on approach using joint mobilization..."
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  required
                  value={formData.detailedDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      detailedDescription: e.target.value,
                    })
                  }
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                  placeholder="Detailed explanation of the service..."
                />
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Key Benefits
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addBenefit())
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                    placeholder="Add a benefit"
                  />
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="px-4 py-2 bg-[#2e3192] text-white rounded-lg hover:bg-[#4c46a3] transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {(formData.keyBenefits || []).map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-green-50 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="flex-1 text-sm text-gray-900">
                        {benefit}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="p-1 hover:bg-green-100 rounded transition-colors"
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration & Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                    placeholder="45-60 minutes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pricing *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pricing}
                    onChange={(e) =>
                      setFormData({ ...formData, pricing: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                    placeholder="Contact for pricing"
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
                  {editingService ? "Update Service" : "Add Service"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
