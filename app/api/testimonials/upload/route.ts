import { NextRequest } from "next/server";
import { verifyAuth, unauthorizedResponse } from "@/lib/utils/auth";
import { uploadToCloudinary } from "@/lib/utils/cloudinaryUpload";

export async function POST(request: NextRequest) {
  try {
    const authUser = verifyAuth(request);
    if (!authUser) return unauthorizedResponse();

    const result = await uploadToCloudinary(request, "media", "testimonials");
    if (!result.success) {
      return Response.json({ message: result.error }, { status: 400 });
    }

    return Response.json({
      message: "Media uploaded successfully",
      imageUrl: result.imageUrl,
      publicId: result.publicId,
    });
  } catch (error: any) {
    return Response.json(
      { message: "Error uploading media", error: error.message },
      { status: 500 },
    );
  }
}
