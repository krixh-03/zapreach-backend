import { useState } from "react";
import FileUpload from "../components/FileUpload";
import EmailForm from "../components/EmailForm";
import LeadTable from "../components/LeadTable";
import Header from "../components/Header";
import RatingsSection from "../components/RatingsSection";

export type Lead = {
  firstName: string;
  email: string;
  status: "pending" | "sent" | "replied";
};

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero + Form Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Hero Text */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
            Find, Contact & Close<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Your Ideal Clients
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Instantly helps you find warm leads, scale email campaigns, reach primary inboxes, engage smarter and win more with AI.
          </p>
          <div className="space-y-2">
            <button className="px-6 py-3 bg-pink-500 text-white font-semibold text-lg rounded-lg hover:bg-pink-600 transition">
              START FOR FREE
            </button>
            <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500 pt-2">
              <span>✅ No credit card required</span>
              <span>🔥 Free leads included</span>
            </div>
          </div>
        </div>

        {/* Right: Form Upload & Email */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-6">
          <FileUpload setLeads={setLeads} />
          <EmailForm />
        </div>
      </div>

      {/* Ratings Section (Below Hero+Form) */}
      <RatingsSection />

      {/* Leads Table (Only if leads exist) */}
      {leads.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 py-10">
          <LeadTable leads={leads} />
        </div>
      )}
    </div>
  );
}
