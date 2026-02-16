import { NextRequest } from "next/server";
import cloudinary from "@/lib/config/cloudinary";

export interface CloudinaryUploadResult {
  success: boolean;
  imageUrl?: string;
  publicId?: string;
  error?: string;
}

/**
 * Upload file to Cloudinary from Next.js request
 * @param request - Next.js request object
 * @param fieldName - Form field name (default: 'image')
 * @param folder - Cloudinary folder name (default: 'services')
 * @returns Upload result with imageUrl or error
 */
export async function uploadToCloudinary(
  request: NextRequest,
  fieldName: string = "image",
  folder: string = "services",
): Promise<CloudinaryUploadResult> {
  try {
    const formData = await request.formData();
    const file = formData.get(fieldName) as File | null;

    if (!file) {
      return {
        success: false,
        error: "No file uploaded",
      };
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Only image files are allowed (JPEG, PNG, GIF, WebP)",
      };
    }

    // Validate file size (10MB limit for images)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        error: "File size exceeds 10MB limit",
      };
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using upload_stream
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "auto",
          transformation: [
            { width: 1200, height: 800, crop: "limit" },
            { quality: "auto:good" },
            { fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      uploadStream.end(buffer);
    });

    return {
      success: true,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error.message || "Error uploading file to Cloudinary",
    };
  }
}

/**
 * Delete file from Cloudinary
 * @param publicId - Cloudinary public ID
 * @returns Success status
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error: any) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
}
