"use server"

import { Resend } from "resend"

interface BookingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  service: string
  preferredDate: string
  preferredTime: string
  appointmentType: string
  urgency: string
  previousTreatment: boolean
  insuranceProvider: string
  referralSource: string
  symptoms: string
  medicalHistory: string
  currentMedications: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelation: string
  agreeToTerms: boolean
  agreeToPrivacy: boolean
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function bookAppointment(data: BookingData) {
  try {
    // Format the booking data for email
    const bookingDetails = `
NEW APPOINTMENT BOOKING REQUEST
================================

PATIENT INFORMATION:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Phone: ${data.phone}
- Date of Birth: ${data.dateOfBirth}

APPOINTMENT DETAILS:
- Service: ${data.service}
- Preferred Date: ${data.preferredDate}
- Preferred Time: ${data.preferredTime}
- Type: ${data.appointmentType}
- Urgency: ${data.urgency}

MEDICAL INFORMATION:
- Previous Treatment: ${data.previousTreatment ? "Yes" : "No"}
- Insurance Provider: ${data.insuranceProvider || "Not provided"}
- Referral Source: ${data.referralSource || "Not specified"}
- Current Symptoms: ${data.symptoms}
- Medical History: ${data.medicalHistory || "None provided"}
- Current Medications: ${data.currentMedications || "None provided"}

EMERGENCY CONTACT:
- Name: ${data.emergencyContactName}
- Phone: ${data.emergencyContactPhone}
- Relationship: ${data.emergencyContactRelation}

CONSENT:
- Terms Agreed: ${data.agreeToTerms ? "Yes" : "No"}
- Privacy Agreed: ${data.agreeToPrivacy ? "Yes" : "No"}

Submitted on: ${new Date().toLocaleString()}
    `

    // Send email to clinic owner
    await resend.emails.send({
      from: "Reflex Physiotherapy <onboarding@resend.dev>",
      to: ["physiomaksudur24@gmail.com"],
      subject: `🏥 New Appointment Request - ${data.firstName} ${data.lastName} (${data.urgency.toUpperCase()})`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #2e3192, #4c46a3); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🏥 Reflex Physiotherapy & Rehab Center</h1>
            <p style="color: #e8e9ff; margin: 10px 0 0 0; font-size: 16px;">New Appointment Booking Request</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
              <h2 style="color: #856404; margin: 0; font-size: 18px;">⚡ ${data.urgency.toUpperCase()} Priority Request</h2>
              <p style="color: #856404; margin: 5px 0 0 0;">Service: ${data.service} | Date: ${data.preferredDate} at ${data.preferredTime}</p>
            </div>

            <div style="display: grid; gap: 25px;">
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #2e3192;">
                <h3 style="color: #2e3192; margin: 0 0 15px 0; font-size: 18px;">👤 Patient Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 5px 0; font-weight: bold; width: 140px;">Name:</td><td>${data.firstName} ${data.lastName}</td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}" style="color: #2e3192;">${data.email}</a></td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Phone:</td><td><a href="tel:${data.phone}" style="color: #2e3192;">${data.phone}</a></td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Date of Birth:</td><td>${data.dateOfBirth}</td></tr>
                </table>
              </div>

              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
                <h3 style="color: #28a745; margin: 0 0 15px 0; font-size: 18px;">📅 Appointment Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 5px 0; font-weight: bold; width: 140px;">Service:</td><td><span style="background: #2e3192; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px;">${data.service}</span></td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Preferred Date:</td><td>${data.preferredDate}</td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Preferred Time:</td><td>${data.preferredTime}</td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Type:</td><td>${data.appointmentType}</td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Urgency:</td><td><span style="background: ${data.urgency === "emergency" ? "#dc3545" : data.urgency === "urgent" ? "#fd7e14" : "#28a745"}; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px;">${data.urgency.toUpperCase()}</span></td></tr>
                </table>
              </div>

              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545;">
                <h3 style="color: #dc3545; margin: 0 0 15px 0; font-size: 18px;">🏥 Medical Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 5px 0; font-weight: bold; width: 140px;">Previous Treatment:</td><td>${data.previousTreatment ? "✅ Yes" : "❌ No"}</td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Insurance:</td><td>${data.insuranceProvider || "Not provided"}</td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Referral Source:</td><td>${data.referralSource || "Not specified"}</td></tr>
                </table>
                <div style="margin-top: 15px;">
                  <h4 style="color: #dc3545; margin: 0 0 8px 0;">Current Symptoms:</h4>
                  <p style="background: white; padding: 12px; border-radius: 4px; margin: 0; line-height: 1.5;">${data.symptoms}</p>
                </div>
                ${
                  data.medicalHistory
                    ? `
                <div style="margin-top: 15px;">
                  <h4 style="color: #dc3545; margin: 0 0 8px 0;">Medical History:</h4>
                  <p style="background: white; padding: 12px; border-radius: 4px; margin: 0; line-height: 1.5;">${data.medicalHistory}</p>
                </div>
                `
                    : ""
                }
                ${
                  data.currentMedications
                    ? `
                <div style="margin-top: 15px;">
                  <h4 style="color: #dc3545; margin: 0 0 8px 0;">Current Medications:</h4>
                  <p style="background: white; padding: 12px; border-radius: 4px; margin: 0; line-height: 1.5;">${data.currentMedications}</p>
                </div>
                `
                    : ""
                }
              </div>

              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #6f42c1;">
                <h3 style="color: #6f42c1; margin: 0 0 15px 0; font-size: 18px;">🚨 Emergency Contact</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 5px 0; font-weight: bold; width: 140px;">Name:</td><td>${data.emergencyContactName}</td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Phone:</td><td><a href="tel:${data.emergencyContactPhone}" style="color: #6f42c1;">${data.emergencyContactPhone}</a></td></tr>
                  <tr><td style="padding: 5px 0; font-weight: bold;">Relationship:</td><td>${data.emergencyContactRelation}</td></tr>
                </table>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #2e3192, #4c46a3); color: white; padding: 20px; border-radius: 8px; margin-top: 30px; text-align: center;">
              <h3 style="margin: 0 0 10px 0;">📞 Next Steps</h3>
              <p style="margin: 0; line-height: 1.6;">
                Please contact ${data.firstName} within 24 hours to confirm this appointment.<br>
                Patient Email: <a href="mailto:${data.email}" style="color: #e8e9ff;">${data.email}</a> | 
                Phone: <a href="tel:${data.phone}" style="color: #e8e9ff;">${data.phone}</a>
              </p>
            </div>
          </div>
          
          <div style="background: #2e3192; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Submitted on: ${new Date().toLocaleString()}</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">Reflex Physiotherapy & Rehab Center - Uttara</p>
          </div>
        </div>
      `,
    })

    // Send confirmation email to patient
    await resend.emails.send({
      from: "Reflex Physiotherapy <onboarding@resend.dev>",
      to: [data.email],
      subject: "✅ Appointment Request Received - Reflex Physiotherapy",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #2e3192, #4c46a3); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🏥 Reflex Physiotherapy</h1>
            <p style="color: #e8e9ff; margin: 10px 0 0 0; font-size: 16px;">& Rehab Center - Uttara</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin-bottom: 25px; text-align: center;">
              <h2 style="color: #155724; margin: 0 0 10px 0; font-size: 24px;">✅ Request Received!</h2>
              <p style="color: #155724; margin: 0; font-size: 16px;">Thank you for choosing Reflex Physiotherapy for your rehabilitation needs.</p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Dear <strong>${data.firstName}</strong>,</p>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              We have successfully received your appointment request for <strong>${data.service}</strong> 
              on <strong>${data.preferredDate}</strong> at <strong>${data.preferredTime}</strong>.
            </p>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #2e3192; margin: 25px 0;">
              <h3 style="color: #2e3192; margin: 0 0 15px 0;">📋 Your Request Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 140px;">Service:</td>
                  <td>${data.service}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Date & Time:</td>
                  <td>${data.preferredDate} at ${data.preferredTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Type:</td>
                  <td>${data.appointmentType}</td>
                </tr>
              </table>
            </div>

            <h3 style="color: #2e3192; margin: 25px 0 15px 0;">⏭️ Next Steps</h3>
            <ol style="padding-left: 20px; line-height: 1.6;">
              <li style="margin-bottom: 10px;">Our team will review your request and check availability.</li>
              <li style="margin-bottom: 10px;">We will contact you within 24 hours to confirm your appointment.</li>
              <li style="margin-bottom: 10px;">Once confirmed, you'll receive a confirmation email with additional details.</li>
            </ol>

            <div style="background: #fff3cd; border: 1px solid #ffeeba; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h4 style="color: #856404; margin: 0 0 10px 0;">⚠️ Important Information</h4>
              <ul style="padding-left: 20px; margin: 0; color: #856404;">
                <li style="margin-bottom: 8px;">Please arrive 15 minutes before your scheduled appointment.</li>
                <li style="margin-bottom: 8px;">Bring any relevant medical records or imaging results.</li>
                <li style="margin-bottom: 8px;">Wear comfortable clothing that allows easy access to the area requiring treatment.</li>
              </ul>
            </div>

            <p style="font-size: 16px; line-height: 1.6; margin: 25px 0;">
              If you have any questions or need to make changes to your appointment, please contact us at:
            </p>

            <div style="text-align: center; margin: 25px 0;">
              <div style="display: inline-block; background: #2e3192; color: white; padding: 15px 25px; border-radius: 8px; text-decoration: none;">
                <div style="font-size: 18px; font-weight: bold;">📞 01684522924</div>
                <div style="font-size: 14px; margin-top: 5px;">physiomaksudur24@gmail.com</div>
              </div>
            </div>

            <p style="font-size: 16px; line-height: 1.6;">
              We look forward to helping you on your journey to better health and wellness!
            </p>

            <p style="font-size: 16px; line-height: 1.6; margin-top: 25px;">
              Warm regards,<br>
              <strong>The Reflex Physiotherapy Team</strong>
            </p>
          </div>
          
          <div style="background: #2e3192; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0 0 10px 0;">Reflex Physiotherapy & Rehab Center</p>
            <p style="margin: 0; font-size: 14px;">House#17, Road#05, Sector#12, Level#05, Uttara</p>
          </div>
        </div>
      `,
    })

    return { success: true, message: "Appointment request submitted successfully!" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to submit appointment request. Please try again." }
  }
}
