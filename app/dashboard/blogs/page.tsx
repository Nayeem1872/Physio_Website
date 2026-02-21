"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  User,
  X,
  Image as ImageIcon,
  FileText,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "react-hot-toast";
import BlogCategoriesList from "./components/BlogCategoriesList";
import BlogCategoryForm from "./components/BlogCategoryForm";
import BlogPostsList from "./components/BlogPostsList";
import BlogPostForm from "./components/BlogPostForm";

interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string | { _id: string; name: string; slug: string };
  author: string;
  readTime: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogsManagementPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"categories" | "posts">("posts");
  const [showForm, setShowForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(
    null,
  );
  const [refreshCategoriesTrigger, setRefreshCategoriesTrigger] = useState(0);
  const [refreshBlogsTrigger, setRefreshBlogsTrigger] = useState(0);

  // Calculate blog counts per category (will be updated when we fetch from API)
  const blogCounts = {} as { [key: string]: number };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleBlogSuccess = () => {
    setRefreshBlogsTrigger((prev) => prev + 1);
  };

  const handleCloseBlogForm = () => {
    setShowForm(false);
    setEditingBlog(null);
  };

  const handleEditCategory = (category: BlogCategory) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleCategorySuccess = () => {
    setRefreshCategoriesTrigger((prev) => prev + 1);
  };

  const handleCloseCategoryForm = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (category: string) => {
    // This is now handled in BlogCategoriesList component
  };

  const handleCancelCategory = () => {
    setShowCategoryForm(false);
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Blog Management
              </h1>
              <p className="text-gray-600">
                {activeTab === "categories"
                  ? "Manage blog categories"
                  : "Create and manage your blog posts"}
              </p>
            </div>
            <Button
              onClick={() =>
                activeTab === "categories"
                  ? setShowCategoryForm(true)
                  : setShowForm(true)
              }
              className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192]/90 hover:to-[#4c46a3]/90"
            >
              <Plus className="h-5 w-5 mr-2" />
              {activeTab === "categories" ? "New Category" : "New Blog Post"}
            </Button>
          </div>

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
                  Blog Categories
                </button>
                <button
                  onClick={() => setActiveTab("posts")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "posts"
                      ? "border-[#2e3192] text-[#2e3192]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <FileText className="h-5 w-5 inline-block mr-2" />
                  Blog Posts
                </button>
              </nav>
            </div>
          </div>

          {/* Category Form Modal */}
          <BlogCategoryForm
            isOpen={showCategoryForm}
            onClose={handleCloseCategoryForm}
            editingCategory={editingCategory}
            onSuccess={handleCategorySuccess}
          />

          {/* Blog Post Form Modal */}
          <BlogPostForm
            isOpen={showForm}
            onClose={handleCloseBlogForm}
            editingBlog={editingBlog}
            onSuccess={handleBlogSuccess}
          />

          {/* Categories Tab Content */}
          {activeTab === "categories" && (
            <BlogCategoriesList
              onEdit={handleEditCategory}
              refreshTrigger={refreshCategoriesTrigger}
              blogCounts={blogCounts}
            />
          )}

          {/* Blog Posts Tab Content */}
          {activeTab === "posts" && (
            <BlogPostsList
              onEdit={handleEdit}
              refreshTrigger={refreshBlogsTrigger}
            />
          )}
        </main>
      </div>
    </div>
  );
}
