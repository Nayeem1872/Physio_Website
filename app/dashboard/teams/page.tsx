"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { Plus, Users, Award } from "lucide-react";
import TeamMembersList from "./components/TeamMembersList";
import TeamMemberForm from "./components/TeamMemberForm";
import LeadershipList from "./components/LeadershipList";
import LeadershipForm from "./components/LeadershipForm";
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
  order: number;
}

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

export default function TeamsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"team" | "leadership">("team");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingLeadership, setEditingLeadership] = useState<Leadership | null>(
    null,
  );
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleEditLeadership = (leadership: Leadership) => {
    setEditingLeadership(leadership);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingMember(null);
    setEditingLeadership(null);
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
                {activeTab === "team"
                  ? "Team Management"
                  : "Leadership Management"}
              </h1>
              <p className="text-gray-600">
                {activeTab === "team"
                  ? "Manage your physiotherapy team members"
                  : "Manage leadership team and their quotes"}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5" />
              {activeTab === "team" ? "Add Team Member" : "Add Leadership"}
            </motion.button>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 bg-white rounded-xl p-2 shadow-lg border border-gray-100 w-fit">
              <button
                onClick={() => {
                  setActiveTab("team");
                  setIsFormOpen(false);
                  setEditingMember(null);
                  setEditingLeadership(null);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "team"
                    ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Users className="h-5 w-5" />
                Team Members
              </button>
              <button
                onClick={() => {
                  setActiveTab("leadership");
                  setIsFormOpen(false);
                  setEditingMember(null);
                  setEditingLeadership(null);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "leadership"
                    ? "bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Award className="h-5 w-5" />
                Leadership
              </button>
            </div>
          </motion.div>

          {/* Content */}
          {activeTab === "team" ? (
            <TeamMembersList
              onEdit={handleEdit}
              refreshTrigger={refreshTrigger}
            />
          ) : (
            <LeadershipList
              onEdit={handleEditLeadership}
              refreshTrigger={refreshTrigger}
              onSuccess={handleSuccess}
            />
          )}
        </main>
      </div>

      {/* Add/Edit Form Modal */}
      {activeTab === "team" ? (
        <TeamMemberForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          editingMember={editingMember}
          onSuccess={handleSuccess}
        />
      ) : (
        <LeadershipForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          editingLeadership={editingLeadership}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
