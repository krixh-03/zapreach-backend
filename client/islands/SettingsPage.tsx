
import { h } from "preact";
import { useState } from "preact/hooks";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div class="max-w-2xl mx-auto space-y-6">
      <h2 class="text-2xl font-semibold">Settings</h2>

      <div class="bg-white p-4 shadow rounded space-y-4">
        <div>
          <label class="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            class="mt-1 w-full px-4 py-2 border rounded"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone((e.target as HTMLSelectElement).value)}
            class="mt-1 w-full px-4 py-2 border rounded"
          >
            <option value="UTC">UTC</option>
            <option value="IST">IST (India Standard Time)</option>
            <option value="EST">EST (Eastern Standard Time)</option>
            <option value="PST">PST (Pacific Standard Time)</option>
          </select>
        </div>

        <div class="flex items-center space-x-2">
          <input
            id="notifications"
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <label htmlFor="notifications">Enable Email Notifications</label>
        </div>

        <button
          onClick={handleSave}
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
