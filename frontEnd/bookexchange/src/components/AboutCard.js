import React from "react";



const AboutCard = ({ image, title, description }) => (
  <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/10">
    <img src={image} alt={title} className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
    <div className="p-6 backdrop-blur-sm bg-black/20">
      <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-md">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  </div>
);

  export default AboutCard;