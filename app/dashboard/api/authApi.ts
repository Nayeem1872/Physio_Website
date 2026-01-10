// Auth API utility functions

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Get logged-in user information
export const getUserInfoAPI = async (): Promise<User> => {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user information");
  }

  return response.json();
};
