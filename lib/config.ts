// Backend API Configuration
// Change this URL to match your backend server
// export const BACKEND_URL = "http://localhost:5000";
export const BACKEND_URL = "";
// http://reflexphysiobd.com/api/

// Helper function to get full media URL
export const getMediaUrl = (mediaPath: string): string => {
  if (!mediaPath) return "";

  // If it's already a relative path or a non-http path, just return it with BACKEND_URL prefix
  if (!mediaPath.startsWith("http")) {
    return `${BACKEND_URL}${mediaPath}`;
  }

  // If it's an absolute URL but points to an internal upload, convert it to relative
  // This handles cases where old database entries have hardcoded absolute URLs
  try {
    const url = new URL(mediaPath);
    if (url.pathname.startsWith('/uploads/')) {
      return url.pathname;
    }
  } catch (e) {
    // If URL parsing fails, just return as is
  }

  return mediaPath;
};
