import { NextRequest } from "next/server";
import { verifyAuth, unauthorizedResponse } from "@/lib/utils/auth";
import { uploadToCloudinary } from "@/lib/utils/cloudinaryUpload";

// POST /api/blogs/upload
export async function POST(request: NextRequest) {
  try {
    const authUser = verifyAuth(request);
    if (!authUser) {
      return unauthorizedResponse();
    }

    const result = await uploadToCloudinary(request, "image", "blogs");

    if (!result.success) {
      return Response.json({ message: result.error }, { status: 400 });
    }

    return Response.json({
      message: "Image uploaded successfully",
      imageUrl: result.imageUrl,
      publicId: result.publicId,
    });
  } catch (error: any) {
    return Response.json(
      {
        message: "Error uploading image",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
