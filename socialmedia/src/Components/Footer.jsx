// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="
      // ✅ FIX: fixed bottom-0 w-full for visibility on scroll
      fixed bottom-0 w-full z-10
      
      bg-gradient-to-r from-purple-900 to-blue-900 
      text-white 
      p-6 
      shadow-inner 
      border-t border-purple-600/50
    ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Copyright and Brand Name */}
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-bold tracking-wider">
            Krishant's App 🚀
          </p>
          <p className="text-sm text-blue-200 mt-1">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#privacy" className="hover:text-purple-300 transition duration-200">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-purple-300 transition duration-200">
            Terms of Service
          </a>
          <a href="#support" className="hover:text-purple-300 transition duration-200">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;