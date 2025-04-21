
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
    
    // Optional: Frontend check for CSV
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setMsg("❌ Invalid file type. Only CSV files are allowed.");
      return;
    }
    
    setMsg("⏳ Sending emails...");
    
    const formData = new FormData();
    formData.append("csv", file);
    formData.append("template", template);
    
    console.log("Sending request to server...");
    const res = await fetch("http://localhost:8787/send", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + btoa("zapadmin:supersecret123"),
        "x-api-key": "howareyouharshithareyouplayinggames"
      },
      body: formData,
    });
    
    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);
    
    const textResponse = await res.text();
    console.log("Response text:", textResponse);
    
    if (res.ok) {
      setMsg("✅ Emails sent successfully!");
    } else {
      setMsg(`❌ Error: ${textResponse || 'Unknown error'} (Status: ${res.status})`);
    }
  } catch (error) {
    console.error("Exception occurred:", error);
    setMsg(`❌ Error: ${error.message}`);
  }
};

  return (
    <div class="p-4 max-w-md mx-auto space-y-4">
      <input
        class="block w-full border p-2"
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.currentTarget.files?.[0] ?? null)}
      />
      <textarea
        class="block w-full border p-2"
        rows={5}
        placeholder="Enter your email template here"
        value={template}
        onInput={(e) => setTemplate(e.currentTarget.value)}
      />
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={sendEmail}
      >
        Send Emails
      </button>
      <p class="mt-2 text-sm">{msg}</p>
    </div>
  );
}
