// Backend API Configuration
// Change this URL to match your backend server
export const BACKEND_URL = "http://localhost:5000";
// export const BACKEND_URL = "https://reflexphysiobd.com";
// http://reflexphysiobd.com/api/

// Helper function to get full media URL
export const getMediaUrl = (mediaPath: string): string => {
  if (!mediaPath) return "";
  if (mediaPath.startsWith("http")) {
    return mediaPath;
  }
  return `${BACKEND_URL}${mediaPath}`;
};
