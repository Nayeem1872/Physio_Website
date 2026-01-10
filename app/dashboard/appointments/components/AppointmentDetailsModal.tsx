"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  FileText,
  Heart,
  Shield,
  Users,
  Save,
  Trash2,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  updateAppointmentAPI,
  deleteAppointmentAPI,
  Appointment,
} from "../api/appointmentsApi";

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
  onUpdate: () => void;
}

export default function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
  onUpdate,
}: AppointmentDetailsModalProps) {
  const [status, setStatus] = useState(appointment.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen) return null;

  const handleUpdateStatus = async () => {
    if (status === appointment.status) {
      toast.error("No changes to save");
      return;
    }

    const updateToast = toast.loading("Updating status...");
    setIsUpdating(true);

    try {
      await updateAppointmentAPI(appointment._id, { status });
      toast.success("Status updated successfully!", { id: updateToast });
      onUpdate();
      onClose();
    } catch (error: any) {
      console.error("Error updating appointment:", error);
      toast.error(error.message || "Failed to update status", {
        id: updateToast,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const deleteToast = toast.loading("Deleting appointment...");
    setIsDeleting(true);

    try {
      await deleteAppointmentAPI(appointment._id);
      toast.success("Appointment deleted successfully!", { id: deleteToast });
      onUpdate();
      onClose();
    } catch (error: any) {
      console.error("Error deleting appointment:", error);
      toast.error(error.message || "Failed to delete appointment", {
        id: deleteToast,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Appointment Details</h2>
            <p className="text-sm opacity-90 mt-1">
              ID: {appointment._id.slice(-8)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Update Section */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Update Status
            </h3>
            <div className="flex items-center gap-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                disabled={isUpdating || status === appointment.status}
                className="flex items-center gap-2 px-4 py-2 bg-[#2e3192] text-white rounded-lg hover:bg-[#4c46a3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Patient Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-[#2e3192]" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Full Name</p>
                <p className="font-medium text-gray-900">
                  {appointment.firstName} {appointment.lastName}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                <p className="font-medium text-gray-900">
                  {new Date(appointment.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </p>
                <p className="font-medium text-gray-900">{appointment.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Phone
                </p>
                <p className="font-medium text-gray-900">{appointment.phone}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#2e3192]" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Service</p>
                <p className="font-medium text-gray-900">{appointment.service}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Appointment Type</p>
                <p className="font-medium text-gray-900 capitalize">
                  {appointment.appointmentType.replace("-", " ")}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Preferred Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(appointment.preferredDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Preferred Time</p>
                <p className="font-medium text-gray-900">
                  {appointment.preferredTime}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Urgency</p>
                <p className="font-medium text-gray-900 capitalize">
                  {appointment.urgency}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Previous Treatment</p>
                <p className="font-medium text-gray-900">
                  {appointment.previousTreatment ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#2e3192]" />
              Medical Information
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Current Symptoms</p>
                <p className="text-gray-900">{appointment.symptoms}</p>
              </div>
              {appointment.medicalHistory && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Medical History</p>
                  <p className="text-gray-900">{appointment.medicalHistory}</p>
                </div>
              )}
              {appointment.currentMedications && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Current Medications</p>
                  <p className="text-gray-900">{appointment.currentMedications}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          {(appointment.insuranceProvider || appointment.referralSource) && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#2e3192]" />
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointment.insuranceProvider && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Insurance Provider</p>
                    <p className="font-medium text-gray-900">
                      {appointment.insuranceProvider}
                    </p>
                  </div>
                )}
                {appointment.referralSource && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Referral Source</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {appointment.referralSource}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Emergency Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-[#2e3192]" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="font-medium text-gray-900">
                  {appointment.emergencyContactName}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-medium text-gray-900">
                  {appointment.emergencyContactPhone}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Relationship</p>
                <p className="font-medium text-gray-900">
                  {appointment.emergencyContactRelation}
                </p>
              </div>
            </div>
          </div>

          {/* Delete Section */}
          {!showDeleteConfirm ? (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete Appointment
              </button>
            </div>
          ) : (
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <p className="text-red-800 font-medium mb-3">
                Are you sure you want to delete this appointment? This action cannot
                be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
