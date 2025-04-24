import { useState } from "preact/hooks";

export default function SendEmail() {
  const [file, setFile] = useState<File | null>(null);
  const [template, setTemplate] = useState("");
  const [msg, setMsg] = useState("");

  const sendEmail = async () => {
    try {
      if (!file) {
        setMsg("❌ Please select a CSV file.");
        return;
      }

      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        setMsg("❌ Invalid file type. Only CSV files are allowed.");
        return;
      }

      setMsg("⏳ Sending emails...");

      const formData = new FormData();
      formData.append("csv", file);
      formData.append("template", template);

      const res = await fetch("http://localhost:8787/send", {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa("zapadmin:supersecret123"),
          "x-api-key": "howareyouharshithareyouplayinggames",
        },
        body: formData,
      });

      const textResponse = await res.text();

      if (res.ok) {
        setMsg("✅ Emails sent successfully!");
      } else {
        setMsg(`❌ Error: ${textResponse || "Unknown error"} (Status: ${res.status})`);
      }
    } catch (error) {
      console.error("Exception occurred:", error);
      setMsg(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div class="w-full max-w-2xl bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6 rounded-2xl shadow-xl border border-yellow-300">
      <label class="block text-sm font-semibold text-gray-800 mb-1">Upload CSV File</label>
      <input
        class="block w-full border border-gray-300 rounded-md shadow-sm p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.currentTarget.files?.[0] ?? null)}
      />

      <label class="block text-sm font-semibold text-gray-800 mb-1">Email Template</label>
      <textarea
        class="block w-full border border-gray-300 rounded-md shadow-sm p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        rows={6}
        placeholder="Hi {{name}}, we noticed you're doing amazing work at {{company}}..."
        value={template}
        onInput={(e) => setTemplate(e.currentTarget.value)}
      />

      <button
        class="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-xl transition duration-200 shadow"
        onClick={sendEmail}
      >
        ✉️ Send Emails
      </button>

      {msg && <p class="mt-4 text-center text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
