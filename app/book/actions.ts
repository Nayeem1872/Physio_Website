"use server";

export interface AppointmentData {
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
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

export async function bookAppointment(data: AppointmentData) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    const response = await fetch(`${API_URL}/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Failed to book appointment. Please try again.",
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: "Appointment request submitted successfully!",
      data: result,
    };
  } catch (error) {
    console.error("Error booking appointment:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
