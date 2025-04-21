import React, { useState } from "react";

export default function NavBar() {
  const [activeTab, setActiveTab] = useState("Products");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <nav className="w-full p-4 border-b bg-white mb-6">
      <div className="flex justify-center space-x-8">
        <div
          className={`relative cursor-pointer text-lg font-medium ${activeTab === "Products" ? "text-pink-600" : "text-gray-800"}`}
          onClick={() => handleTabClick("Products")}
        >
          <span>Products</span>
          {activeTab === "Products" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-pink-600 rounded-full"></div>
          )}
        </div>
        <div
          className={`relative cursor-pointer text-lg font-medium ${activeTab === "Resources" ? "text-pink-600" : "text-gray-800"}`}
          onClick={() => handleTabClick("Resources")}
        >
          <span>Resources</span>
          {activeTab === "Resources" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-pink-600 rounded-full"></div>
          )}
        </div>
        <div
          className={`relative cursor-pointer text-lg font-medium ${activeTab === "Use Cases" ? "text-pink-600" : "text-gray-800"}`}
          onClick={() => handleTabClick("Use Cases")}
        >
          <span>Use Cases</span>
          {activeTab === "Use Cases" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-pink-600 rounded-full"></div>
          )}
        </div>
        <div
          className={`relative cursor-pointer text-lg font-medium ${activeTab === "Pricing" ? "text-pink-600" : "text-gray-800"}`}
          onClick={() => handleTabClick("Pricing")}
        >
          <span>Pricing</span>
          {activeTab === "Pricing" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-pink-600 rounded-full"></div>
          )}
        </div>
      </div>
    </nav>
  );
}
