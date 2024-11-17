// AboutCard.js
// This component renders an individual card in the About section
// Each card displays an image, title, and description with glass morphism effect
import React from "react";

// /**
//  * AboutCard Component
//  * @param {string} image - URL of the card's image
//  * @param {string} title - Title text for the card
//  * @param {string} description - Description text for the card
//  * @returns {JSX.Element} A card component with hover effects and glass morphism styling
//  */
const AboutCard = ({ image, title, description }) => (
  // Main card container with glass morphism effect
  // Uses backdrop blur and transparent white background for glass effect
  // Includes hover animations for scale and shadow
  <div className="backdrop-blur-md                    /* Creates frosted glass effect */
              bg-white/5                          /* Semi-transparent white background */
              rounded-xl                          /* Rounded corners */
              border border-white/10             /* Subtle border */
              overflow-hidden                    /* Keeps child elements within bounds */
              transition-all duration-300        /* Smooth transitions for hover effects */
              hover:transform hover:scale-105    /* Slight enlargement on hover */
              hover:shadow-xl                    /* Enhanced shadow on hover */
              hover:shadow-emerald-500/10"       /* Emerald tint to shadow on hover */
  >
    {/* Image section */}
    {/* Image is slightly transparent by default and becomes fully opaque on hover */}
    <img 
      src={image} 
      alt={title} 
      className="w-full                           /* Full width of container */
                h-48                            /* Fixed height */
                object-cover                    /* Maintains aspect ratio, covers area */
                opacity-80                      /* Slightly transparent by default */
                hover:opacity-100               /* Full opacity on hover */
                transition-opacity duration-300" /* Smooth opacity transition */
    />

    {/* Content section */}
    {/* Additional glass effect with dark background for better text readability */}
    <div className="p-6                            /* Padding around content */
                backdrop-blur-sm                  /* Light blur effect */
                bg-black/20"                     /* Semi-transparent black background */
    >
      {/* Card title */}
      {/* White text with drop shadow for better visibility */}
      <h3 className="text-xl                        /* Large text size */
                  font-semibold                   /* Bold weight */
                  mb-3                           /* Margin bottom for spacing */
                  text-white                     /* White text color */
                  drop-shadow-md"                /* Text shadow for depth */
      >
        {title}
      </h3>

      {/* Card description */}
      {/* Light gray text with comfortable line height */}
      <p className="text-gray-300                   /* Light gray text color */
                 leading-relaxed"                /* Increased line height for readability */
      >
        {description}
      </p>
    </div>
  </div>
);

// Export the component for use in other parts of the application
export default AboutCard;

/* CSS Effects Breakdown:

1. Glass Morphism:
   - backdrop-blur-md: Creates frosted glass effect
   - bg-white/5: Semi-transparent white background
   - border-white/10: Subtle white border

2. Hover Animations:
   - scale-105: Card grows to 105% size
   - shadow-xl: Larger shadow appears
   - opacity changes from 80% to 100% for image

3. Transitions:
   - duration-300: All transitions take 300ms
   - transition-all: Applies to all changing properties
   - transition-opacity: Specific to image opacity

4. Responsiveness:
   - w-full: Full width of container
   - h-48: Fixed height for consistent layout

5. Text Styling:
   - drop-shadow-md: Text shadow for depth
   - leading-relaxed: Comfortable line height
   - font-semibold: Bold text for title
*/