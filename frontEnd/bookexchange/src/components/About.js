import React from "react";
import AboutCard from "./AboutCard";

  const About = () => (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-emerald-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-4">About Us</h2>
          <div className="w-24 h-1 bg-emerald-500/50 mx-auto rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Decorative blur effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <AboutCard
            image="/api/placeholder/400/300"
            title="Easy Exchange"
            description="List your books and browse through thousands of available titles for exchange."
          />
          <AboutCard
            image="/api/placeholder/400/300"
            title="Growing Community"
            description="Join thousands of book lovers who share their passion for reading."
          />
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