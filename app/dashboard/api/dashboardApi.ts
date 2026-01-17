// Dashboard API utility functions
import { BACKEND_URL } from "@/lib/config";

export interface DashboardStats {
  appointments: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    urgent: number;
    emergency: number;
    byType: Array<{
      _id: string;
      count: number;
    }>;
    recent: Array<{
      _id: string;
      firstName: string;
      lastName: string;
      service: string;
      preferredDate: string;
      urgency: string;
      status: string;
    }>;
    trend: Array<{
      _id: string;
      count: number;
    }>;
  };
  blogs: {
    total: number;
    published: number;
    unpublished: number;
    categories: number;
    recent: Array<{
      _id: string;
      title: string;
      category: {
        _id: string;
        name: string;
      };
      author: string;
      createdAt: string;
    }>;
  };
  services: {
    total: number;
    published: number;
    unpublished: number;
    categories: number;
    popular: Array<{
      _id: string;
      count: number;
    }>;
  };
  team: {
    total: number;
  };
  testimonials: {
    total: number;
    published: number;
    unpublished: number;
    averageRating: string;
  };
  faqs: {
    total: number;
    published: number;
    unpublished: number;
  };
  users: {
    total: number;
  };
}

export interface DashboardOverview {
  totalAppointments: number;
  pendingAppointments: number;
  todayAppointments: number;
  totalBlogs: number;
  totalServices: number;
  totalTestimonials: number;
  totalTeamMembers: number;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Get dashboard statistics
export const getDashboardStatsAPI = async (): Promise<DashboardStats> => {
  const response = await fetch(`${BACKEND_URL}/api/dashboard/stats`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return response.json();
};

// Get dashboard overview
export const getDashboardOverviewAPI = async (): Promise<DashboardOverview> => {
  const response = await fetch(`${BACKEND_URL}/api/dashboard/overview`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard overview");
  }

  return response.json();
};
