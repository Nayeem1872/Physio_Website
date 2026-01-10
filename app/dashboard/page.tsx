"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardNavbar from "./components/DashboardNavbar";
import {
  Users,
  Calendar,
  FileText,
  TrendingUp,
  Activity,
  Clock,
  Briefcase,
  MessageSquare,
  HelpCircle,
  Loader2,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import toast, { Toaster } from "react-hot-toast";
import {
  getDashboardStatsAPI,
  DashboardStats,
} from "./api/dashboardApi";
import { getUserInfoAPI, User } from "./api/authApi";

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchDashboardData();
    fetchUserInfo();
    
    // Show welcome toast if just logged in
    const justLoggedIn = sessionStorage.getItem("justLoggedIn");
    if (justLoggedIn === "true") {
      sessionStorage.removeItem("justLoggedIn");
      setTimeout(() => {
        toast.success("Welcome back! You've successfully logged in.");
      }, 500);
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const userData = await getUserInfoAPI();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const statsData = await getDashboardStatsAPI();
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const statsCards = stats
    ? [
        {
          title: "Total Appointments",
          value: stats.appointments.total.toString(),
          subtitle: `${stats.appointments.pending} pending`,
          icon: Calendar,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Blog Posts",
          value: stats.blogs.total.toString(),
          subtitle: `${stats.blogs.published} published`,
          icon: FileText,
          color: "from-purple-500 to-purple-600",
        },
        {
          title: "Services",
          value: stats.services.total.toString(),
          subtitle: `${stats.services.categories} categories`,
          icon: Briefcase,
          color: "from-green-500 to-green-600",
        },
        {
          title: "Team Members",
          value: stats.team.total.toString(),
          subtitle: "Active members",
          icon: Users,
          color: "from-orange-500 to-orange-600",
        },
        {
          title: "Testimonials",
          value: stats.testimonials.total.toString(),
          subtitle: `${stats.testimonials.averageRating} avg rating`,
          icon: MessageSquare,
          color: "from-pink-500 to-pink-600",
        },
        {
          title: "FAQs",
          value: stats.faqs.total.toString(),
          subtitle: `${stats.faqs.published} published`,
          icon: HelpCircle,
          color: "from-indigo-500 to-indigo-600",
        },
      ]
    : [];

  // Prepare chart data
  const appointmentStatusData = stats
    ? [
        { name: "Pending", value: stats.appointments.pending, color: "#FCD34D" },
        { name: "Confirmed", value: stats.appointments.confirmed, color: "#60A5FA" },
        { name: "Completed", value: stats.appointments.completed, color: "#34D399" },
        { name: "Cancelled", value: stats.appointments.cancelled, color: "#F87171" },
      ].filter((item) => item.value > 0)
    : [];

  const appointmentTypeData = stats
    ? stats.appointments.byType.map((type) => ({
        name: type._id.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        value: type.count,
      }))
    : [];

  const contentStatsData = stats
    ? [
        {
          name: "Blogs",
          total: stats.blogs.total,
          published: stats.blogs.published,
          unpublished: stats.blogs.unpublished,
        },
        {
          name: "Services",
          total: stats.services.total,
          published: stats.services.published,
          unpublished: stats.services.unpublished,
        },
        {
          name: "Testimonials",
          total: stats.testimonials.total,
          published: stats.testimonials.published,
          unpublished: stats.testimonials.unpublished,
        },
        {
          name: "FAQs",
          total: stats.faqs.total,
          published: stats.faqs.published,
          unpublished: stats.faqs.unpublished,
        },
      ]
    : [];

  const appointmentTrendData = stats
    ? stats.appointments.trend.map((item) => ({
        date: new Date(item._id).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        count: item.count,
      }))
    : [];

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
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user ? `Welcome back, ${user.name.split(" ")[0]}!` : "Dashboard Overview"}
            </h1>
            <p className="text-gray-600">
              {user
                ? "Here's what's happening with your physiotherapy center today."
                : "Welcome back! Here's what's happening today."}
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 text-[#2e3192] animate-spin" />
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                {statsCards.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500">{stat.subtitle}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Appointments Status Pie Chart */}
                {appointmentStatusData.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Appointments by Status
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={appointmentStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {appointmentStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {/* Appointment Types Pie Chart */}
                {appointmentTypeData.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Appointments by Type
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={appointmentTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {appointmentTypeData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={["#2e3192", "#60A5FA", "#34D399"][index % 3]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {/* Content Statistics Bar Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Content Statistics
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={contentStatsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#2e3192" name="Total" />
                      <Bar dataKey="published" fill="#34D399" name="Published" />
                      <Bar dataKey="unpublished" fill="#F87171" name="Unpublished" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Appointment Trend Line Chart */}
                {appointmentTrendData.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Appointment Trend
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={appointmentTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#2e3192" name="Appointments" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Appointments */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">
                        Recent Appointments
                      </h2>
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    {stats && stats.appointments.recent.length > 0 ? (
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Patient
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Service
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Urgency
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {stats.appointments.recent.map((appointment) => (
                            <tr
                              key={appointment._id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2e3192] to-[#4c46a3] flex items-center justify-center text-white text-sm font-semibold mr-3">
                                    {appointment.firstName.charAt(0)}
                                    {appointment.lastName.charAt(0)}
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">
                                    {appointment.firstName} {appointment.lastName}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {appointment.service}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {new Date(
                                  appointment.preferredDate
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    appointment.urgency === "emergency"
                                      ? "bg-red-100 text-red-800"
                                      : appointment.urgency === "urgent"
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {appointment.urgency.charAt(0).toUpperCase() +
                                    appointment.urgency.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    appointment.status === "confirmed"
                                      ? "bg-blue-100 text-blue-800"
                                      : appointment.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : appointment.status === "cancelled"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {appointment.status.charAt(0).toUpperCase() +
                                    appointment.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-12 text-center text-gray-500">
                        No recent appointments
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Recent Blogs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">
                        Recent Blogs
                      </h2>
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="p-6">
                    {stats && stats.blogs.recent.length > 0 ? (
                      <div className="space-y-4">
                        {stats.blogs.recent.map((blog) => (
                          <div
                            key={blog._id}
                            className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                              <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {blog.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                by {blog.author}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                  {blog.category.name}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">
                                    {getTimeAgo(blog.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        No recent blogs
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
