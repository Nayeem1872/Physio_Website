# Cloudinary Setup Guide for Services Images

## Overview

This project now uses Cloudinary for storing service images instead of local file storage. Cloudinary provides better performance, automatic image optimization, and CDN delivery.

## Setup Steps

### 1. Create a Cloudinary Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Sign up for a free account
3. After signing in, go to your Dashboard

### 2. Get Your Credentials

From your Cloudinary Dashboard, you'll find:

- **Cloud Name**: Your unique cloud name
- **API Key**: Your API key
- **API Secret**: Your API secret (click "Reveal" to see it)

### 3. Update Environment Variables

Open your `.env.local` file and update the Cloudinary configuration:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Replace `your_cloud_name`, `your_api_key`, and `your_api_secret` with your actual credentials.

### 4. Install Dependencies

Run the following command to install the Cloudinary package:

```bash
npm install
```

### 5. Restart Your Development Server

After updating the environment variables, restart your Next.js server:

```bash
npm run dev
```

## How It Works

### Upload Endpoint

**POST** `/api/services/upload`

Upload an image for a service:

- Accepts multipart/form-data with an `image` field
- Validates file type (JPEG, PNG, GIF, WebP)
- Maximum file size: 10MB
- Automatically optimizes and resizes images
- Returns the Cloudinary URL and public ID

**Request:**

```javascript
const formData = new FormData();
formData.append("image", file);

const response = await fetch("/api/services/upload", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});
```

**Response:**

```json
{
  "message": "Image uploaded successfully",
  "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/abc123.jpg",
  "publicId": "services/abc123"
}
```

### Service Model

The Service model now includes:

- `imageUrl`: The full Cloudinary URL
- `imagePublicId`: The Cloudinary public ID (used for deletion)

### Image Optimization

Images are automatically:

- Resized to max 1200x800px
- Compressed with quality: auto:good
- Converted to optimal format (WebP when supported)
- Delivered via Cloudinary's global CDN

## Features

✅ Automatic image optimization
✅ CDN delivery for fast loading
✅ Responsive image transformations
✅ Secure upload with authentication
✅ File type and size validation
✅ Easy image deletion via public ID

## Folder Structure

Images are organized in Cloudinary folders:

- `services/` - Service images
- You can customize the folder in the upload function

## Testing

1. Make sure your environment variables are set
2. Start the development server
3. Use the services upload endpoint to test image uploads
4. Check your Cloudinary dashboard to see uploaded images

## Troubleshooting

**Error: "No file uploaded"**

- Make sure you're sending the file with the field name `image`

**Error: "Only image files are allowed"**

- Check that you're uploading JPEG, PNG, GIF, or WebP files

**Error: "File size exceeds 10MB limit"**

- Compress your image before uploading

**Error: "Error uploading file to Cloudinary"**

- Verify your Cloudinary credentials in `.env.local`
- Check that your Cloudinary account is active
- Ensure you have upload quota available (free tier: 25 credits/month)
