"use client";
import React, { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import { BACKEND_URL } from "@/lib/config";

interface Testimonial {
  _id: string;
  profileMedia: string;
  mediaType: "image" | "video";
  bannerMedia: string;
  bannerMediaType: "image" | "video";
  fullName: string;
  role: string;
  rating: number;
  testimonial: string;
  service: string;
  date: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TestimonialsResponse {
  count: number;
  testimonials: Testimonial[];
}

interface TestimonialsListProps {
  onEdit: (testimonial: Testimonial) => void;
  refreshTrigger: number;
  filterStatus: "all" | "published" | "unpublished";
}

// API - Get all testimonials
const API_BASE_URL = `${BACKEND_URL}/api/testimonials`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAllTestimonialsAPI = async (
  all: boolean = false
): Promise<TestimonialsResponse> => {
  const url = all ? `${API_BASE_URL}?all=true` : API_BASE_URL;
  const headers = all ? getAuthHeaders() : {};

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  return response.json();
};

// Component
export default function TestimonialsList({
  onEdit,
  refreshTrigger,
  filterStatus,
}: TestimonialsListProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, [refreshTrigger]);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await getAllTestimonialsAPI(true); // Get all with auth
      setTestimonials(response.testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    fetchTestimonials();
  };

  const handleTogglePublish = () => {
    fetchTestimonials();
  };

  // Filter testimonials
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (filterStatus === "published") return testimonial.published;
    if (filterStatus === "unpublished") return !testimonial.published;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading testimonials...</div>
      </div>
    );
  }

  if (filteredTestimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          {filterStatus === "all"
            ? "No testimonials found. Add your first testimonial!"
            : `No ${filterStatus} testimonials`}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredTestimonials.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial._id}
          testimonial={testimonial}
          index={index}
          onEdit={onEdit}
          onDelete={handleDelete}
          onTogglePublish={handleTogglePublish}
        />
      ))}
    </div>
  );
}
