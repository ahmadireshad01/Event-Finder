import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold">
            Trusted by Professionals From
          </h2>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo / Description */}
          <div>
            <h1 className="text-green-500 font-bold text-xl">Evently</h1>
            <p className="mt-2 text-sm">
              Your premier platform for discovering professional events.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-white font-semibold mb-3">Connect With Us</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-blue-500">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-sky-400">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-blue-700">
                <FaLinkedin />
              </a>
            </div>
            <p className="mt-3 text-sm">Email: contact@evently.com</p>
            <p className="text-sm">Phone: +1 (234) 567-890</p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center text-xs text-gray-500 mt-8">
          © 2024 Evently. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
