"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { Plus } from "lucide-react";
import TeamMembersList from "./components/TeamMembersList";
import TeamMemberForm from "./components/TeamMemberForm";
import { Toaster } from "react-hot-toast";

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

export default function TeamsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingMember(null);
  };

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
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
                Team Management
              </h1>
              <p className="text-gray-600">
                Manage your physiotherapy team members
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Team Member
            </motion.button>
          </motion.div>

          {/* Team Members List */}
          <TeamMembersList
            onEdit={handleEdit}
            refreshTrigger={refreshTrigger}
          />
        </main>
      </div>

      {/* Add/Edit Form Modal */}
      <TeamMemberForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        editingMember={editingMember}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
