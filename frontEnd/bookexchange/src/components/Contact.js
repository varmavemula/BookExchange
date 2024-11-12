import React from "react";

const Contact = () => (
    <section className="py-24 bg-gradient-to-b from-emerald-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
  
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-emerald-500/50 mx-auto rounded-full backdrop-blur-sm"></div>
        </div>
  
        <div className="max-w-lg mx-auto">
          <form className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl space-y-6">
            {/* Name Input */}
            <div>
              <label 
                className="block text-gray-200 mb-2 font-medium" 
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                         focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                         focus:ring-emerald-400/20 text-white placeholder-gray-400 
                         backdrop-blur-md transition-all duration-300"
                placeholder="Enter your name"
              />
            </div>
  
            {/* Email Input */}
            <div>
              <label 
                className="block text-gray-200 mb-2 font-medium" 
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                         focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                         focus:ring-emerald-400/20 text-white placeholder-gray-400 
                         backdrop-blur-md transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
  
            {/* Mobile Input */}
            <div>
              <label 
                className="block text-gray-200 mb-2 font-medium" 
                htmlFor="mobile"
              >
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                         focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                         focus:ring-emerald-400/20 text-white placeholder-gray-400 
                         backdrop-blur-md transition-all duration-300"
                placeholder="Enter your mobile number"
              />
            </div>
  
            {/* Message Textarea */}
            <div>
              <label 
                className="block text-gray-200 mb-2 font-medium" 
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                         focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                         focus:ring-emerald-400/20 text-white placeholder-gray-400 
                         backdrop-blur-md transition-all duration-300 resize-none"
                placeholder="Enter your message"
              ></textarea>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg backdrop-blur-md bg-emerald-500/50 
                       hover:bg-emerald-500/70 border border-emerald-400/30 
                       text-white font-semibold shadow-lg hover:shadow-emerald-500/20 
                       transition-all duration-300 transform hover:translate-y-[-1px]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
  
      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
    </section>
  );

export default Contact;