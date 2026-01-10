"use client";
import React, { useState, useEffect } from "react";
import FAQCard from "./FAQCard";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FAQsResponse {
  count: number;
  faqs: FAQ[];
}

interface FAQsListProps {
  onEdit: (faq: FAQ) => void;
  refreshTrigger: number;
  filterStatus: "all" | "published" | "unpublished";
  categoryFilter: string;
}

// API - Get all FAQs
const API_BASE_URL = "http://localhost:5000/api/faqs";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAllFAQsAPI = async (all: boolean = false): Promise<FAQsResponse> => {
  const url = all ? `${API_BASE_URL}?all=true` : API_BASE_URL;
  const headers = all ? getAuthHeaders() : {};

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  return response.json();
};

// Component
export default function FAQsList({
  onEdit,
  refreshTrigger,
  filterStatus,
  categoryFilter,
}: FAQsListProps) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, [refreshTrigger]);

  const fetchFAQs = async () => {
    try {
      setIsLoading(true);
      const response = await getAllFAQsAPI(true);
      setFaqs(response.faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    fetchFAQs();
  };

  const handleTogglePublish = () => {
    fetchFAQs();
  };

  // Filter FAQs
  const filteredFAQs = faqs
    .filter((faq) => {
      if (filterStatus === "published") return faq.published;
      if (filterStatus === "unpublished") return !faq.published;
      return true;
    })
    .filter((faq) => {
      if (categoryFilter === "all") return true;
      return faq.category === categoryFilter;
    })
    .sort((a, b) => a.order - b.order);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading FAQs...</div>
      </div>
    );
  }

  if (filteredFAQs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          {filterStatus === "all" && categoryFilter === "all"
            ? "No FAQs found. Add your first FAQ!"
            : "No FAQs match your filters"}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {filteredFAQs.map((faq, index) => (
        <FAQCard
          key={faq._id}
          faq={faq}
          index={index}
          onEdit={onEdit}
          onDelete={handleDelete}
          onTogglePublish={handleTogglePublish}
        />
      ))}
    </div>
  );
}
