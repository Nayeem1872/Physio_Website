"use client";
import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";

interface Service {
  _id: string;
  category: { _id: string; name: string } | string;
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  keyBenefits: string[];
  duration: string;
  pricing: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServicesResponse {
  count: number;
  services: Service[];
}

interface ServicesListProps {
  onEdit: (service: Service) => void;
  refreshTrigger: number;
  categoryFilter: string;
}

// API - Get all services
const API_BASE_URL = "http://localhost:5000/api/services";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAllServicesAPI = async (
  all: boolean = false,
  categoryId?: string
): Promise<ServicesResponse> => {
  let url = API_BASE_URL;
  const params = new URLSearchParams();
  
  if (all) params.append("all", "true");
  if (categoryId && categoryId !== "All") params.append("category", categoryId);
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const headers = all ? getAuthHeaders() : {};

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return response.json();
};

// Component
export default function ServicesList({
  onEdit,
  refreshTrigger,
  categoryFilter,
}: ServicesListProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [refreshTrigger, categoryFilter]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await getAllServicesAPI(true, categoryFilter);
      setServices(response.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    fetchServices();
  };

  const handleTogglePublish = () => {
    fetchServices();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading services...</div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          {categoryFilter === "All"
            ? "No services found. Add your first service!"
            : "No services in this category"}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {services.map((service, index) => (
        <ServiceCard
          key={service._id}
          service={service}
          index={index}
          onEdit={onEdit}
          onDelete={handleDelete}
          onTogglePublish={handleTogglePublish}
        />
      ))}
    </div>
  );
}
