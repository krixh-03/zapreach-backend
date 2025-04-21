import React, { useState } from "react";

export default function EmailForm() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    if (!subject || !body) {
      alert("Please enter both subject and body.");
      return;
    }

    // TODO: Call backend API to send emails
    console.log("Sending emails with subject:", subject);
    console.log("Body:", body);
  };

  return (
    <div className="bg-white shadow p-4 rounded-xl border space-y-4">
      <h2 className="text-lg font-semibold">Compose Email</h2>

      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <textarea
        rows={6}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Hi {{firstName}}, just wanted to reach out..."
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Send Emails
      </button>
    </div>
  );
}
