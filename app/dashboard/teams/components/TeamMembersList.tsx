"use client";
import React, { useState, useEffect } from "react";
import TeamMemberCard from "./TeamMemberCard";

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

interface TeamMemberResponse {
  _id: string;
  profileImage: string;
  fullName: string;
  title: string;
  specialization: string;
  experience: string;
  education: string;
  certifications: string[];
  specialties: string[];
  biography: string;
  email: string;
  phone: string;
  availability: string;
  languages: string[];
  createdAt: string;
  updatedAt: string;
}

interface TeamMembersListResponse {
  count: number;
  teamMembers: TeamMemberResponse[];
}

interface TeamMembersListProps {
  onEdit: (member: TeamMember) => void;
  refreshTrigger: number;
}

// API - Get all team members
const API_BASE_URL = "http://localhost:5000/api/team";

export const getAllTeamMembersAPI = async (): Promise<TeamMembersListResponse> => {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch team members");
  }

  return response.json();
};

// Component
export default function TeamMembersList({
  onEdit,
  refreshTrigger,
}: TeamMembersListProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, [refreshTrigger]);

  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      const response = await getAllTeamMembersAPI();
      const members = response.teamMembers.map((member) => ({
        id: member._id,
        name: member.fullName,
        title: member.title,
        specialization: member.specialization,
        experience: member.experience,
        education: member.education,
        certifications: member.certifications,
        specialties: member.specialties,
        bio: member.biography,
        email: member.email,
        phone: member.phone,
        availability: member.availability,
        languages: member.languages.join(", "),
        image: member.profileImage,
      }));
      setTeamMembers(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    fetchTeamMembers();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading team members...</div>
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">
          No team members found. Add your first team member!
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {teamMembers.map((member, index) => (
        <TeamMemberCard
          key={member.id}
          member={member}
          index={index}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
