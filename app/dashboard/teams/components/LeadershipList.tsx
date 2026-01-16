"use client";
import React, { useState, useEffect } from "react";
import LeadershipCard from "./LeadershipCard";
import { BACKEND_URL } from "@/lib/config";

export interface Leadership {
  _id: string;
  name: string;
  position: string;
  role: "chairman" | "ceo" | "other";
  quote: string;
  image: string;
  badge: string;
  icon: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LeadershipListProps {
  onEdit: (leadership: Leadership) => void;
  refreshTrigger: number;
  onSuccess: () => void;
}

export default function LeadershipList({
  onEdit,
  refreshTrigger,
  onSuccess,
}: LeadershipListProps) {
  const [leadership, setLeadership] = useState<Leadership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterRole, setFilterRole] = useState<
    "all" | "chairman" | "ceo" | "other"
  >("all");

  useEffect(() => {
    fetchLeadership();
  }, [refreshTrigger]);

  const fetchLeadership = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/leadership?all=true`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLeadership(data.leadership || []);
      }
    } catch (error) {
      console.error("Error fetching leadership:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLeadership = leadership
    .filter((item) => {
      if (filterRole === "all") return true;
      return item.role === filterRole;
    })
    .sort((a, b) => a.order - b.order); // Sort by order

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading leadership...</div>
      </div>
    );
  }

  return (
    <>
      {/* Filter Buttons */}
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilterRole("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filterRole === "all"
              ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All ({leadership.length})
        </button>
        <button
          onClick={() => setFilterRole("chairman")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filterRole === "chairman"
              ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          Chairman ({leadership.filter((l) => l.role === "chairman").length})
        </button>
        <button
          onClick={() => setFilterRole("ceo")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filterRole === "ceo"
              ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          CEO ({leadership.filter((l) => l.role === "ceo").length})
        </button>
        <button
          onClick={() => setFilterRole("other")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filterRole === "other"
              ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          Other ({leadership.filter((l) => l.role === "other").length})
        </button>
      </div>

      {filteredLeadership.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500">
            No leadership entries found. Add your first one!
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLeadership.map((item, index) => (
            <LeadershipCard
              key={item._id}
              leadership={item}
              index={index}
              onEdit={onEdit}
              onSuccess={onSuccess}
            />
          ))}
        </div>
      )}
    </>
  );
}
