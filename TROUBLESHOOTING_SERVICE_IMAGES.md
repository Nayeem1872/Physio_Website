# Troubleshooting Service Images

## Issue: Images Not Showing on Home/Services Page

### Quick Fixes

#### 1. Clear Next.js Cache

```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force .next

# Mac/Linux
rm -rf .next
```

Then restart the dev server:

```bash
npm run dev
```

#### 2. Hard Refresh Browser

- **Chrome/Edge**: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- **Firefox**: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
- **Safari**: `Cmd + Option + R`

#### 3. Clear Browser Cache

1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Verification Steps

#### Check 1: Verify API Response

Open browser DevTools → Network tab → Look for `/api/services` request

The response should include `imageUrl`:

```json
{
  "services": [
    {
      "_id": "...",
      "name": "Service Name",
      "imageUrl": "https://res.cloudinary.com/.../image.jpg",
      ...
    }
  ]
}
```

#### Check 2: Verify Image URL is Valid

Copy the `imageUrl` from the API response and paste it directly in browser address bar. The image should load.

#### Check 3: Check Browser Console

Open DevTools → Console tab → Look for any errors related to:

- CORS errors
- Image loading errors
- Network errors

#### Check 4: Verify Component Rendering

In browser DevTools → Elements tab:

1. Find a service card element
2. Look for the blurred background div
3. Check if `style="background-image: url(...)"` is present
4. Hover over the card to trigger the effect

### Common Issues

#### Issue: Image URL is Empty or Undefined

**Cause**: Service doesn't have an image uploaded
**Solution**:

1. Go to Dashboard → Services
2. Edit the service
3. Upload an image
4. Save

#### Issue: Image URL is Relative Path (starts with `/uploads/`)

**Cause**: Old local file upload instead of Cloudinary
**Solution**:

1. Re-upload the image through the dashboard
2. The new upload will use Cloudinary

#### Issue: CORS Error

**Cause**: Cloudinary blocking requests
**Solution**:

1. Check Cloudinary dashboard settings
2. Ensure your domain is allowed
3. Verify Cloudinary credentials in `.env.local`

#### Issue: Image Shows in Dashboard but Not on Frontend

**Cause**: Browser caching or Next.js caching
**Solution**:

1. Clear Next.js cache: `rm -rf .next`
2. Hard refresh browser
3. Restart dev server

### Testing the Effect

1. **Open the home page** (`http://localhost:3000`)
2. **Scroll to Services section**
3. **Hover over a service card**
4. **Expected behavior**:
   - Blurred background image fades in
   - Image is heavily blurred
   - White overlay maintains readability
   - Smooth 500ms transition

### Debug Mode

To enable debug logging, temporarily add this to `ServiceSection.tsx`:

```tsx
{
  services.map((service) => {
    console.log("Service:", service.name, "ImageURL:", service.imageUrl);
    // ... rest of code
  });
}
```

Check browser console to see if `imageUrl` is present.

### File Checklist

Ensure these files have the correct implementation:

- ✅ `app/components/ServiceSection.tsx` - Has blur effect code
- ✅ `app/services/page.tsx` - Has blur effect code
- ✅ `app/hooks/useServices.ts` - Includes `imageUrl` in interface
- ✅ `lib/models/Service.ts` - Has `imageUrl` field
- ✅ `app/api/services/route.ts` - Returns `imageUrl` in response

### Still Not Working?

1. **Check if service has image**:

   ```bash
   # Test API directly
   curl http://localhost:3000/api/services
   ```

   Look for `imageUrl` field in response

2. **Verify Cloudinary URL is accessible**:
   - Copy the `imageUrl` value
   - Paste in browser
   - Image should load

3. **Check Network Tab**:
   - Open DevTools → Network
   - Filter by "Img"
   - Look for Cloudinary requests
   - Check if they're successful (200 status)

4. **Inspect Element**:
   - Right-click on service card
   - Select "Inspect"
   - Look for the blur background div
   - Check if `background-image` style is applied

### Expected HTML Structure

```html
<div class="group h-full">
  <div class="... overflow-hidden">
    <!-- Blur background (only if imageUrl exists) -->
    <div class="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 ...">
      <div style="background-image: url(https://res.cloudinary.com/...)"></div>
      <div class="absolute inset-0 bg-white/90"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Service content -->
    </div>
  </div>
</div>
```

### Performance Check

If images are loading slowly:

1. Check Cloudinary optimization settings
2. Verify image file sizes
3. Check network speed
4. Consider using Cloudinary transformations for smaller sizes

### Contact Support

If none of these solutions work:

1. Check browser console for errors
2. Verify all environment variables are set
3. Ensure Cloudinary account is active
4. Test with a different browser
