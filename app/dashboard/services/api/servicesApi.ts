// Services API utility functions
import { BACKEND_URL } from "@/lib/config";

export interface Service {
  _id: string;
  category: string;
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  keyBenefits: string[];
  duration: string;
  pricing: string;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  count: number;
  services: Service[];
}

export interface CreateServicePayload {
  category: string;
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  keyBenefits: string[];
  duration: string;
  pricing: string;
  imageUrl?: string;
  published?: boolean;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Get all services
export const getAllServicesAPI = async (
  categoryId?: string,
  includeUnpublished = false
): Promise<ServicesResponse> => {
  const params = new URLSearchParams();
  
  if (categoryId) {
    params.append("category", categoryId);
  }
  
  if (includeUnpublished) {
    params.append("all", "true");
  }

  const url = `${BACKEND_URL}/api/services${params.toString() ? `?${params.toString()}` : ""}`;
  
  const headers: HeadersInit = {};
  if (includeUnpublished) {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return response.json();
};

// Get a single service
export const getServiceByIdAPI = async (id: string): Promise<Service> => {
  const response = await fetch(`${BACKEND_URL}/api/services/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch service");
  }

  return response.json();
};

// Create a new service
export const createServiceAPI = async (
  payload: CreateServicePayload
): Promise<Service> => {
  const response = await fetch(`${BACKEND_URL}/api/services`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create service");
  }

  return response.json();
};

// Update a service
export const updateServiceAPI = async (
  id: string,
  payload: Partial<CreateServicePayload>
): Promise<Service> => {
  const response = await fetch(`${BACKEND_URL}/api/services/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update service");
  }

  return response.json();
};

// Delete a service
export const deleteServiceAPI = async (id: string): Promise<any> => {
  const response = await fetch(`${BACKEND_URL}/api/services/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete service");
  }

  return response.json();
};
