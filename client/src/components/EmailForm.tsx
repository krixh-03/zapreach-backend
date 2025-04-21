// src/components/EmailForm.tsx
import { useState } from "react";

export default function EmailForm() {
  const [template, setTemplate] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleSend = async () => {
    if (!csvFile || !template) {
      setStatus("❌ Please upload a CSV and type an email template.");
      return;
    }

    const formData = new FormData();
    formData.append("csv", csvFile);
    formData.append("template", template);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY!,
        },
        body: formData,
      });

      const text = await response.text();
      if (!response.ok) throw new Error(text);

      setStatus("✅ Emails sent successfully!");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div className="space-y-4">
      <label>
        <span className="font-semibold">Upload CSV:</span>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
          className="mt-2"
        />
      </label>

      <label>
        <span className="font-semibold">Email Template (use {'{name}'}):</span>
        <textarea
          rows={6}
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mt-2"
          placeholder="Hey {name}, check out our new tool!"
        />
      </label>

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Emails
      </button>

      {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}
    </div>
  );
}
