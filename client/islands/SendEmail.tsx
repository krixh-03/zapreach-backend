import { useEffect, useState } from "preact/hooks";

export default function SendEmail() {
  const [file, setFile] = useState<File | null>(null);
  const [template, setTemplate] = useState("");
  const [subjectTemplate, setSubjectTemplate] = useState("");
  const [msg, setMsg] = useState("");
  const [templateWarning, setTemplateWarning] = useState(true);
  const [subjectTemplateWarning, setSubjectTemplateWarning] = useState(true);
  
  useEffect(() => {
    if (template && !template.includes("{{name}}") && !template.includes("{{ name }}")) {
      setTemplateWarning(true);
    } else {
      setTemplateWarning(false);
    }
  }, [template]);

  useEffect(() => {
    if (subjectTemplate && !subjectTemplate.includes("{{name}}") && !subjectTemplate.includes("{{ name }}")) {    
      setSubjectTemplateWarning(true);
    } else {
      setSubjectTemplateWarning(false);
    }
  }, [subjectTemplate]);
  
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
      formData.append("subject", subjectTemplate);
      const res = await fetch("http://localhost:8787/send", {
        method: "POST",
        body: formData,
      });
      const textResponse = await res.text();
      if (res.ok) {
        setMsg("✅ Emails sent successfully!");
      } else {
        setMsg(`❌ Error: ${textResponse || "Unknown error"} (Status: ${res.status})`);
      }
    } catch (error: any) {
      console.error("Exception occurred:", error);
      setMsg(`❌ Error: ${error.message}`);
    }
  };
  
  function handleFileUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(!file) return;
    setFile(file);
  }
  
  return (
    <div class="w-full max-w-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-6 rounded-2xl shadow-xl border border-yellow-300">
      <label class="block text-sm font-semibold text-gray-200 mb-1">Upload CSV File (📄 Upload a CSV with 'name' and 'email' columns.)</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        class="mb-4 block w-full bg-gray-800 border border-gray-600 p-2 rounded"
      />
      <label class="block text-sm font-semibold text-gray-200 mb-1">Email Subject Template</label>
      <input
        type="text"
        class="block w-full bg-gray-700 text-white border border-gray-700 rounded-md shadow-sm p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="Hello {{name}}, this might help you!"
        value={subjectTemplate}
        onInput={(e) => setSubjectTemplate(e.currentTarget.value)} 
      />
      {subjectTemplateWarning && (
         <p class="text-yellow-400 text-sm mb-4">⚠️ Name placeholder is missing. Please use {"{"}{"{"}name{"}"}{"}"} to personalize your email.</p>  
      )}
      <label class="block text-sm font-semibold text-gray-200 mb-1">Email Template</label>
      <textarea
        class="block w-full bg-gray-700 text-white border border-gray-700 rounded-md shadow-sm p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        rows={6}
        placeholder="Hi {{name}}, we noticed you're doing amazing work"
        value={template}
        onInput={(e) => setTemplate(e.currentTarget.value)}
      />
      {templateWarning && (
         <p class="text-yellow-400 text-sm mb-4">⚠️ Name placeholder is missing. Please use {"{"}{"{"}name{"}"}{"}"} to personalize your email.</p>  
      )}
      <button
        type="button"
        class="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-xl transition duration-200 shadow"
        onClick={sendEmail}
      >
        ✉️ Send Emails
      </button>
      {msg && <p class="mt-4 text-center text-sm text-gray-300">{msg}</p>}
    </div>
  );
}