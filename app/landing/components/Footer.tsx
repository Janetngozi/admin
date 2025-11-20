'use client';

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-600">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Top Section - Left: Social & Copyright | Right: Links */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 mb-12 pb-12 border-b border-blue-500">
          {/* Left - Social Icons and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-6">
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                <Facebook className="w-5 h-5 text-blue-600" />
              </a>
              <a href="#" className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                <Instagram className="w-5 h-5 text-blue-600" />
              </a>
              <a href="#" className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                <Twitter className="w-5 h-5 text-blue-600" />
              </a>
              <a href="#" className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                <Youtube className="w-5 h-5 text-blue-600" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-left text-white text-sm">
              <p>Copyright © 2025 STEC-SpecFast Technica LLC</p>
              <p>Products Powered by <a href="#" className="underline hover:no-underline">Highlands</a></p>
            </div>
          </div>

          {/* Right - Footer Links Grid */}
          <div className="grid grid-cols-3 gap-12 md:gap-16">
            {/* Categories */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Office products</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Technology</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Furniture</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Facility & breakdown</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Shopping & returns</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Terms of service</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Privacy policy</a></li>
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Need help?</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Start a return</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">FAQ</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Full Width White */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
          {/* Left - STEC Logo with Line */}
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <div className="w-12 h-0.5 bg-blue-600"></div>
            <img src="/STEC-logo 1.png" alt="STEC Logo" className="h-12 w-auto" />
            <div className="w-12 h-0.5 bg-blue-600"></div>
          </div>

          {/* Right - Member Badge with Line */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-0.5 bg-blue-600"></div>
            <img src="/frame102.png" alt="Member Badge" className="h-10 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}
