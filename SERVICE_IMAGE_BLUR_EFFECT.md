# Service Image Blur Background Effect ✨

## Overview

Added a beautiful blurred background image effect to service cards that appears on hover, creating an elegant and modern visual experience.

## Implementation

### Where It's Applied

1. **Home Page** - ServiceSection component (`app/components/ServiceSection.tsx`)
2. **Services Page** - Full services listing (`app/services/page.tsx`)

### How It Works

When a user hovers over a service card:

1. The service image (if available) appears as a blurred background
2. A semi-transparent white overlay (90% opacity) is applied
3. The content remains fully readable and elevated above the background
4. Smooth transition animations create a polished effect

### Technical Details

```tsx
{
  /* Blurred Background Image */
}
{
  service.imageUrl && (
    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
        style={{
          backgroundImage: `url(${service.imageUrl})`,
        }}
      />
      <div className="absolute inset-0 bg-white/90" />
    </div>
  );
}
```

### CSS Classes Used

- `absolute inset-0` - Covers the entire card
- `z-0` - Places behind content
- `opacity-0 group-hover:opacity-100` - Hidden by default, visible on hover
- `transition-opacity duration-500` - Smooth fade-in animation
- `blur-2xl` - Heavy blur effect (40px)
- `scale-110` - Slightly scaled up to avoid blur edges
- `bg-white/90` - 90% white overlay for readability

### Visual Effect Breakdown

1. **Default State**
   - Clean white card with icon and text
   - No background image visible

2. **Hover State**
   - Blurred service image fades in behind content
   - White overlay maintains text readability
   - Icon scales and rotates slightly
   - Card lifts with shadow enhancement
   - Arrow indicator appears

3. **Transition**
   - 500ms smooth opacity transition
   - Coordinated with other hover effects

## Benefits

✅ **Visual Appeal** - Modern, elegant design that catches attention
✅ **Context** - Shows service imagery without cluttering the card
✅ **Readability** - White overlay ensures text remains clear
✅ **Performance** - CSS-only effect, no JavaScript required
✅ **Responsive** - Works seamlessly on all screen sizes
✅ **Accessibility** - Doesn't interfere with content or navigation

## Customization Options

### Adjust Blur Intensity

Change `blur-2xl` to:

- `blur-xl` - Less blur (24px)
- `blur-3xl` - More blur (64px)

### Adjust Overlay Opacity

Change `bg-white/90` to:

- `bg-white/80` - More image visible
- `bg-white/95` - Less image visible

### Adjust Transition Speed

Change `duration-500` to:

- `duration-300` - Faster
- `duration-700` - Slower

### Change Overlay Color

Replace `bg-white/90` with:

- `bg-gray-50/90` - Subtle gray tint
- `bg-blue-50/90` - Blue tint
- `bg-gradient-to-br from-white/95 to-blue-50/90` - Gradient overlay

## Example Usage

### Home Page Service Cards

```tsx
<motion.div className="group h-full">
  <div className="relative overflow-hidden ...">
    {/* Blurred Background */}
    {service.imageUrl && (
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
          style={{ backgroundImage: `url(${service.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-white/90" />
      </div>
    )}

    {/* Content */}
    <div className="relative z-10">{/* Service content here */}</div>
  </div>
</motion.div>
```

## Browser Compatibility

✅ Chrome/Edge - Full support
✅ Firefox - Full support
✅ Safari - Full support
✅ Mobile browsers - Full support

The `backdrop-filter: blur()` CSS property is well-supported across modern browsers.

## Performance Notes

- Images are loaded from Cloudinary CDN (fast delivery)
- CSS blur is GPU-accelerated
- Opacity transitions are performant
- No layout shifts or reflows
- Smooth 60fps animations

## Future Enhancements

Potential improvements:

- Add parallax effect on scroll
- Implement color extraction from image
- Add subtle animation to background image
- Create different overlay patterns
- Add option to toggle effect in settings

## Testing

To test the effect:

1. Add images to services in the dashboard
2. Visit the home page or services page
3. Hover over service cards
4. Observe the smooth blur effect appearing

## Fallback

If no image is uploaded:

- Cards display normally without background effect
- All other hover effects still work
- No visual glitches or errors
- Graceful degradation

## API Integration

The effect automatically works with images from:

- Cloudinary uploads (via `/api/services/upload`)
- Any valid image URL stored in `service.imageUrl`
- Optimized and cached by Cloudinary

## Summary

This feature adds a premium, modern touch to the service cards while maintaining excellent readability and performance. The blurred background creates visual interest without overwhelming the content, and the smooth transitions provide a polished user experience.
