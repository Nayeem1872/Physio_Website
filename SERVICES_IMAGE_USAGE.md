# Services Image Upload - Frontend Usage

## Quick Reference

### Upload Image for Service

```typescript
// Example: Upload image before creating/updating service
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("token"); // or however you store auth token

  const response = await fetch("/api/services/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return {
    imageUrl: data.imageUrl,
    publicId: data.publicId,
  };
};

// Then create/update service with the imageUrl
const createService = async (serviceData: any, imageFile?: File) => {
  let imageUrl = "";
  let imagePublicId = "";

  // Upload image first if provided
  if (imageFile) {
    const uploadResult = await uploadImage(imageFile);
    imageUrl = uploadResult.imageUrl;
    imagePublicId = uploadResult.publicId;
  }

  // Create service with image URL
  const response = await fetch("/api/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...serviceData,
      imageUrl,
      imagePublicId,
    }),
  });

  return response.json();
};
```

### React Component Example

```tsx
import { useState } from "react";

export function ServiceForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = "";
      let imagePublicId = "";

      // Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadResponse = await fetch("/api/services/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.imageUrl;
        imagePublicId = uploadData.publicId;
      }

      // Create service
      const serviceData = {
        name: "Service Name",
        category: "category-id",
        shortDescription: "Short description",
        detailedDescription: "Detailed description",
        keyBenefits: ["Benefit 1", "Benefit 2"],
        duration: "60 minutes",
        pricing: "$100",
        imageUrl,
        imagePublicId,
        published: true,
      };

      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        alert("Service created successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create service");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Service Image</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ maxWidth: "200px" }} />
        )}
      </div>

      {/* Other form fields */}

      <button type="submit" disabled={uploading}>
        {uploading ? "Creating..." : "Create Service"}
      </button>
    </form>
  );
}
```

## API Endpoints

### GET /api/services

Fetch all services (images included in response)

```typescript
const response = await fetch("/api/services");
const data = await response.json();
// data.services will include imageUrl for each service
```

### POST /api/services

Create a new service (include imageUrl and imagePublicId from upload)

### POST /api/services/upload

Upload image to Cloudinary (requires authentication)

## Image Display

Simply use the `imageUrl` from the service object:

```tsx
<img
  src={service.imageUrl}
  alt={service.name}
  className="w-full h-64 object-cover"
/>
```

Cloudinary will automatically serve optimized images!
