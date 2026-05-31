# Photo Placement Guide

To add photos to your Polaris website, simply add images to this folder and reference them in the HTML files. Here are the photo locations and recommended names:

## Photos to Add

### index.html
- **compass.jpg** - For the "Polaris: Your Compass to Success" section
- **skills.jpg** - For the "Learn Your Skills. Unlock Your Opportunities" section  
- **mission.jpg** - For the "Mission" section
- **home_page_hero.png** - Background image for the hero section (already referenced)

### journey.html
- **technical_image.jpg** - Technical skill type image (update the src in the img tag)
- **creative_image.jpg** - Creative skill type image
- **management_image.jpg** - Management skill type image
- **analytical_image.jpg** - Analytical skill type image

## How to Add Photos

1. Create image files with the names suggested above
2. Place them in the same folder as the HTML files (c:\Users\Owner\Desktop\files (2)\)
3. Update the image src attributes in the HTML files to point to your photos

## Current Image Placeholders

All placeholder images currently have empty `src=""` attributes and a light gray background. Simply add your photo filenames to the src attribute to display them.

Example:
```html
<img src="compass.jpg" alt="Compass" class="img-fluid rounded">
```

## Image Recommendations

- **Format**: JPG or PNG
- **Size**: Keep under 2MB for faster loading
- **Dimensions**: Match the aspect ratio of the container (typically 4:3 or 1:1 for square images)
