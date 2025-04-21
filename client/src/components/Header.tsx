import React from "react";

export default function Header() {
  return (
    <header className="w-full p-4 border-b bg-white mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl">⚡</span>
          <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Zapreach
          </h1>
        </div>

        {/* Center: Navigation */}
        <nav className="flex space-x-8">
          <button className="text-lg font-medium hover:text-pink-500 transition-colors">Products</button>
          <button className="text-lg font-medium hover:text-pink-500 transition-colors">Usecases</button>
          <button className="text-lg font-medium hover:text-pink-500 transition-colors">Resources</button>
          <button className="text-lg font-medium hover:text-pink-500 transition-colors">Pricing</button>
        </nav>

        {/* Right: Action Buttons */}
        <div className="flex space-x-4">
          {/* Login: Transparent Border */}
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-500 transition">
            Login
          </button>

          {/* Get Started: Simple Button */}
          <button className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:text-pink-600 transition">
            Get Started
          </button>

          {/* See Demo: Filled Button */}
          <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
            See Demo
          </button>
        </div>
      </div>
    </header>
  );
}
