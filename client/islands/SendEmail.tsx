/** @jsxImportSource preact */
import { useState, useEffect } from "preact/hooks";
import { Toast } from "../components/Toast.tsx"; // correct path
import { FeedbackPrompt } from "../components/FeedbackPrompt.tsx"; // correct path

export default function SendEmail() {
  const [file, setFile] = useState<File | null>(null);
  const [template, setTemplate] = useState("");
  const [subjectTemplate, setSubjectTemplate] = useState("");
  const [templateWarning, setTemplateWarning] = useState(true);
  const [subjectTemplateWarning, setSubjectTemplateWarning] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "loading"
  >("success");
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (
      template &&
      !template.includes("{{name}}") &&
      !template.includes("{{ name }}")
    ) {
      setTemplateWarning(true);
    } else {
      setTemplateWarning(false);
    }
  }, [template]);

  useEffect(() => {
    if (
      subjectTemplate &&
      !subjectTemplate.includes("{{name}}") &&
      !subjectTemplate.includes("{{ name }}")
    ) {
      setSubjectTemplateWarning(true);
    } else {
      setSubjectTemplateWarning(false);
    }
  }, [subjectTemplate]);

  const sendEmail = async () => {
    try {
      if (!file) {
        setToastMessage("Please select a CSV file.");
        setToastType("error");
        setToastVisible(true);
        setTimeout(()=> {
          setToastVisible(false);
        }, 3000)
        return;
      }
      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        setToastMessage("Invalid file type. Only CSV files are allowed.");
        setToastType("error");
        setToastVisible(true);
        setTimeout(()=> {
          setToastVisible(false);
        }, 3000)
        return;
      }

      setIsLoading(true);
      setToastMessage("Sending emails...");

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
        setIsLoading(false);
        setToastMessage("Emails sent successfully!");
        setToastType("success");
        setToastVisible(true);

        // Show feedback prompt after success
        setTimeout(() => {
          setShowPrompt(true);
        }, 3000); // Delay to allow user to see success message
      } else {
        setIsLoading(false);
        setToastMessage(
          `Error: ${textResponse || "Unknown error"} (Status: ${res.status})`
        );
        setToastType("error");
        setToastVisible(true);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("Exception occurred:", error);
      setToastMessage(`Error: ${error.message}`);
      setToastType("error");
      setToastVisible(true);
    }

    // Hide toast after 5 seconds
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  function handleFileUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    setFile(file);
  }

  // FeedbackPrompt handlers
  const handleSubmit = () => {
    // You can add your feedback submission logic here
    window.location.href = "/feedback"; // Redirect to feedback page
    setShowPrompt(false);
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  return (
    <div class="w-full max-w-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-6 rounded-2xl shadow-xl border border-yellow-300">
      <label class="block text-sm font-semibold text-gray-200 mb-1">
        Upload CSV File (📄 Upload a CSV with 'name' and 'email' columns.)
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        class="mb-4 block w-full bg-gray-800 border border-gray-600 p-2 rounded"
      />
      <label class="block text-sm font-semibold text-gray-200 mb-1">
        Email Subject Template
      </label>
      <input
        type="text"
        class="block w-full bg-gray-700 text-white border border-gray-700 rounded-md shadow-sm p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="Hello {{name}}, this might help you!"
        value={subjectTemplate}
        onInput={(e) => setSubjectTemplate(e.currentTarget.value)}
      />
      {subjectTemplateWarning && (
        <p class="text-yellow-400 text-sm mb-4">
          ⚠️ Name placeholder is missing. Please use {"{"}
          {"{"}name{"}"}
          {"}"} to personalize your email.
        </p>
      )}
      <label class="block text-sm font-semibold text-gray-200 mb-1">
        Email Template
      </label>
      <textarea
        class="block w-full bg-gray-700 text-white border border-gray-700 rounded-md shadow-sm p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        rows={6}
        placeholder="Hi {{name}}, we noticed you're doing amazing work"
        value={template}
        onInput={(e) => setTemplate(e.currentTarget.value)}
      />
      {templateWarning && (
        <p class="text-yellow-400 text-sm mb-4">
          ⚠️ Name placeholder is missing. Please use {"{"}
          {"{"}name{"}"}
          {"}"} to personalize your email.
        </p>
      )}
      <button
        type="button"
        class="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-xl transition duration-200 shadow"
        onClick={sendEmail}
        disabled={isLoading}
      >
        ✉️ Send Emails{" "}
        {isLoading ? (
          <span role="status">
            <svg
              aria-hidden="true"
              class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </span>
        ) : (
          ""
        )}
      </button>

      <Toast message={toastMessage} type={toastType} visible={toastVisible} />

      <FeedbackPrompt
        visible={showPrompt}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
