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
  Clock,
  DollarSign,
  CheckCircle,
  Folder,
  Briefcase,
} from "lucide-react";

interface Service {
  id: string;
  category: string;
  name: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
  duration: string;
  pricing: string;
}

export default function ServicesPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Sample data
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      category: "Manual Therapy",
      name: "Manual Therapy",
      description:
        "Hands-on approach using joint mobilization, soft tissue work, and massage techniques.",
      detailedDescription:
        "Manual therapy is a hands-on approach used by physical therapists to address musculoskeletal pain and improve function. It involves a variety of skilled movements, including joint mobilization, soft tissue work, and massage, to target specific areas and address underlying issues. The goal is to reduce pain, improve range of motion, and enhance overall mobility.",
      benefits: [
        "Reduced pain and inflammation",
        "Improved range of motion",
        "Enhanced mobility",
        "Better circulation",
        "Muscle tension relief",
      ],
      duration: "45-60 minutes",
      pricing: "Contact for pricing",
    },
  ]);

  const [formData, setFormData] = useState<Omit<Service, "id">>({
    category: "",
    name: "",
    description: "",
    detailedDescription: "",
    benefits: [],
    duration: "",
    pricing: "",
  });

  const [benefitInput, setBenefitInput] = useState("");

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

  // Filter services by category
  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, benefitInput.trim()],
      });
      setBenefitInput("");
    }
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingService) {
      // Update existing service
      setServices(
        services.map((service) =>
          service.id === editingService.id
            ? { ...formData, id: editingService.id }
            : service
        )
      );
    } else {
      // Add new service
      const newService: Service = {
        ...formData,
        id: Date.now().toString(),
      };
      setServices([...services, newService]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      category: "",
      name: "",
      description: "",
      detailedDescription: "",
      benefits: [],
      duration: "",
      pricing: "",
    });
    setBenefitInput("");
    setIsFormOpen(false);
    setEditingService(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((service) => service.id !== id));
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
                Services Management
              </h1>
              <p className="text-gray-600">
                Manage your physiotherapy services and categories
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Service
            </motion.button>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((category) => (
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

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
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
                            {service.category}
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
                        onClick={() => handleDelete(service.id)}
                        className="p-2 bg-white/20 hover:bg-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">{service.description}</p>
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
                      {service.benefits.map((benefit, idx) => (
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
            ))}
          </div>

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
        </main>
      </div>

      {/* Add/Edit Form Modal */}
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
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                    placeholder="Manual Therapy"
                  />
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
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
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
                    onKeyPress={(e) =>
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
                  {formData.benefits.map((benefit, index) => (
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
