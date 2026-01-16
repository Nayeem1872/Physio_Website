"use client";
import React, { useState, useEffect } from "react";
import MilestoneCard from "./MilestoneCard";
import { BACKEND_URL } from "@/lib/config";

export interface Milestone {
  _id: string;
  year: string;
  title: string;
  description: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MilestonesListProps {
  onEdit: (milestone: Milestone) => void;
  refreshTrigger: number;
  filterStatus: "all" | "published" | "unpublished";
  onSuccess: () => void;
}

export default function MilestonesList({
  onEdit,
  refreshTrigger,
  filterStatus,
  onSuccess,
}: MilestonesListProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMilestones();
  }, [refreshTrigger]);

  const fetchMilestones = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/milestones`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMilestones(data.milestones || []);
      }
    } catch (error) {
      console.error("Error fetching milestones:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMilestones = milestones.filter((milestone) => {
    if (filterStatus === "published") return milestone.published;
    if (filterStatus === "unpublished") return !milestone.published;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading milestones...</div>
      </div>
    );
  }

  if (filteredMilestones.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          {filterStatus === "all"
            ? "No milestones found. Add your first milestone!"
            : `No ${filterStatus} milestones`}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredMilestones.map((milestone, index) => (
        <MilestoneCard
          key={milestone._id}
          milestone={milestone}
          index={index}
          onEdit={onEdit}
          onSuccess={onSuccess}
        />
      ))}
    </div>
  );
}
