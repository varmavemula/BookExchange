// About.js
// This component represents the About section of the website
// It displays information about the book exchange service using a grid of cards
import React from 'react';
import AboutCard from './AboutCard';

const About = () => (
  // Main section with gradient background
  // py-24 adds significant vertical padding for better spacing
  // Background uses a gradient from dark gray to emerald for visual appeal
  <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-emerald-900">
    {/* Container to control width and add horizontal padding */}
    <div className="container mx-auto px-6">
      {/* Header section with title and decorative underline */}
      <div className="text-center mb-16">
        {/* Section title with drop shadow for depth */}
        <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-4">About Us</h2>
        
        {/* Decorative underline with glass effect */}
        <div className="w-24 h-1 bg-emerald-500/50 mx-auto rounded-full backdrop-blur-sm"></div>
      </div>

      {/* Grid container for the cards */}
      {/* Responsive: 1 column on mobile, 3 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Decorative background effects */}
        {/* Uses absolute positioning and negative z-index to stay behind content */}
        <div className="absolute inset-0 -z-10">
          {/* Top left blur effect */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
          
          {/* Bottom right blur effect */}
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Feature Cards */}
        {/* Each AboutCard component represents a key feature of the service */}
        
        {/* Card 1: Easy Exchange Feature */}
        <AboutCard
          image="/api/placeholder/400/300"
          title="Easy Exchange"
          description="List your books and browse through thousands of available titles for exchange."
        />

        {/* Card 2: Community Feature */}
        <AboutCard
          image="/api/placeholder/400/300"
          title="Growing Community"
          description="Join thousands of book lovers who share their passion for reading."
        />

        {/* Card 3: Shipping Feature */}
        <AboutCard
          image="/api/placeholder/400/300"
          title="Simple Shipping"
          description="Pay only for shipping and receive books right at your doorstep."
        />
      </div>
    </div>
  </section>
);

export default About;

// CSS Class Breakdown:
// py-24: Padding top and bottom of 6rem
// bg-gradient-to-b: Vertical background gradient
// from-gray-900: Start color of gradient
// via-gray-800: Middle color of gradient
// to-emerald-900: End color of gradient
// container: Sets max-width and centers content
// mx-auto: Centers container horizontally
// px-6: Horizontal padding of 1.5rem
// grid: Creates a grid layout
// grid-cols-1: Single column on mobile
// md:grid-cols-3: Three columns on medium screens
// gap-8: Gap of 2rem between grid items
// relative: Enables absolute positioning of children
// absolute: Position element absolutely
// inset-0: Stretch to all edges
// -z-10: Place behind other content
// blur-3xl: Heavy blur effect
// rounded-full: Circular shape