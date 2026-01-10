import { useState, useEffect } from "react";

export interface ServiceCategory {
  _id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  category: ServiceCategory;
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

export const useServices = (categoryId?: string) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const url = categoryId
          ? `/api/services?category=${categoryId}`
          : "/api/services";
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data: ServicesResponse = await response.json();
        setServices(data.services);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [categoryId]);

  return { services, isLoading, error };
};
