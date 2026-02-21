import { NextRequest } from "next/server";
import connectDB from "@/lib/config/database";
import User from "@/lib/models/User";
import { verifyAuth, unauthorizedResponse } from "@/lib/utils/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Verify authentication
    const authUser = verifyAuth(request);
    if (!authUser) {
      return unauthorizedResponse("No token, authorization denied");
    }

    const user = await User.findById(authUser.id).select("-password");

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({
      id: user._id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
