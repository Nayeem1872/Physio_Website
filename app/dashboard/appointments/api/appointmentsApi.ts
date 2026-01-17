// Appointments API utility functions
import { BACKEND_URL } from "@/lib/config";

export interface Appointment {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  appointmentType: string;
  urgency: string;
  previousTreatment: boolean;
  insuranceProvider?: string;
  referralSource?: string;
  symptoms: string;
  medicalHistory?: string;
  currentMedications?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentsResponse {
  count: number;
  appointments: Appointment[];
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Get all appointments
export const getAllAppointmentsAPI = async (
  status?: string,
  urgency?: string
): Promise<AppointmentsResponse> => {
  const params = new URLSearchParams();
  
  if (status) {
    params.append("status", status);
  }
  
  if (urgency) {
    params.append("urgency", urgency);
  }

  const url = `${BACKEND_URL}/api/appointments${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return response.json();
};

// Get a single appointment
export const getAppointmentByIdAPI = async (id: string): Promise<Appointment> => {
  const response = await fetch(`${BACKEND_URL}/api/appointments/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch appointment");
  }

  return response.json();
};

// Update an appointment
export const updateAppointmentAPI = async (
  id: string,
  payload: Partial<Appointment>
): Promise<Appointment> => {
  const response = await fetch(`${BACKEND_URL}/api/appointments/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update appointment");
  }

  return response.json();
};

// Delete an appointment
export const deleteAppointmentAPI = async (id: string): Promise<any> => {
  const response = await fetch(`${BACKEND_URL}/api/appointments/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete appointment");
  }

  return response.json();
};
