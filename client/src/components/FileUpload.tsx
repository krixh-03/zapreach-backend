import React from "react";
import { Lead } from "../pages/Home";
import Papa from "papaparse";

type Props = {
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
};

export default function FileUpload({ setLeads }: Props) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsed: Lead[] = results.data
          .map((row: any) => ({
            firstName: row.firstName?.trim(),
            email: row.email?.trim(),
            status: "pending",
          }))
          .filter((lead: Lead) => lead.firstName && lead.email);
        setLeads(parsed);
      },
    });
  };

  return (
    <div className="bg-white shadow p-4 rounded-xl border">
      <h2 className="text-lg font-semibold mb-2">Upload Leads (CSV)</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-700
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
    </div>
  );
}
