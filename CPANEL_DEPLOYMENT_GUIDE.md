# cPanel Deployment Guide

## ✅ Build Complete!

Your static website has been successfully built and is ready for cPanel upload.

## 📦 Files Ready

- **Zip File**: `physio-website-static.zip` (in project root)
- **Build Folder**: `out/` directory contains all static files

## 🚀 How to Upload to cPanel

### Method 1: Using File Manager (Recommended)

1. **Login to cPanel**
   - Go to your hosting provider's cPanel

2. **Open File Manager**
   - Navigate to File Manager in cPanel

3. **Go to public_html**
   - Open the `public_html` folder (or `www` or `htdocs` depending on your host)

4. **Upload the Zip File**
   - Click "Upload" button
   - Select `physio-website-static.zip`
   - Wait for upload to complete

5. **Extract the Zip**
   - Right-click on `physio-website-static.zip`
   - Select "Extract"
   - Extract to current directory

6. **Move Files**
   - Open the extracted `out` folder
   - Select all files inside
   - Click "Move" and move them to `public_html` root
   - Delete the empty `out` folder and zip file

### Method 2: Direct Upload

1. Open `out/` folder on your computer
2. Select all files and folders inside
3. Upload directly to `public_html` via cPanel File Manager

## ⚠️ Important Notes

### Backend API Configuration

Your app is configured to connect to: `http://reflexphysiobd.com`

Make sure your backend API is:
- Running and accessible
- Has CORS enabled for your domain
- All API endpoints are working

### Features Removed for Static Export

The following features were removed to enable static export:
- ❌ API routes (`/api/*`) - Now calls backend directly
- ❌ Dynamic blog post pages (`/blog/[slug]`) - Removed
- ❌ Server actions - Converted to client-side API calls

### What Still Works

✅ All main pages (Home, About, Services, Team, etc.)
✅ Booking form (calls backend API directly)
✅ Blog listing page
✅ Dashboard pages (UI only, needs backend)
✅ All styling and animations

## 🔧 After Upload

1. Visit your domain to test
2. Check browser console for any API errors
3. Test the booking form
4. Verify images load correctly

## 📝 .htaccess Configuration (Optional)

Create a `.htaccess` file in `public_html` with:

```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Redirect to HTTPS (if you have SSL)
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 🆘 Troubleshooting

**Images not loading?**
- Check that backend URL is correct in `lib/config.ts`
- Verify backend CORS settings

**Booking form not working?**
- Check browser console for errors
- Verify backend API is accessible
- Test API endpoint directly

**404 errors?**
- Make sure all files are in the root of `public_html`
- Check that `index.html` exists

## 📞 Need Help?

If you encounter issues, check:
1. Browser console for JavaScript errors
2. Network tab for failed API requests
3. Backend server logs

---

**Build Date**: January 17, 2026
**Next.js Version**: 14.2.16
**Output Type**: Static Export
