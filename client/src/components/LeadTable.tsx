import React from "react";
import { Lead } from "../pages/Home";

type Props = {
  leads: Lead[];
};

export default function LeadTable({ leads }: Props) {
  if (leads.length === 0) return null;

  return (
    <div className="bg-white shadow p-4 rounded-xl border">
      <h2 className="text-lg font-semibold mb-4">Uploaded Leads</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 border">{lead.firstName}</td>
                <td className="px-4 py-2 border">{lead.email}</td>
                <td className="px-4 py-2 border capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : lead.status === "sent"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
