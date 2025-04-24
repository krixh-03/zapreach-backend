
import { h } from "preact";
import StatCard from "../islands/StatCard.tsx";

export default function Dashboard() {
  return (
    <div class="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside class="w-64 bg-white shadow-lg">
        <div class="p-6 text-xl font-bold">Zapreach</div>
        <nav class="mt-4 space-y-2">
          <a class="block px-6 py-2 hover:bg-gray-200" href="/">Home</a>
          <a class="block px-6 py-2 hover:bg-gray-200" href="/dashboard">Dashboard</a>
          <a class="block px-6 py-2 hover:bg-gray-200" href="#">Campaigns</a>
          <a class="block px-6 py-2 hover:bg-gray-200" href="#">Leads</a>
          <a class="block px-6 py-2 hover:bg-gray-200" href="/settings">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main class="flex-1 p-6">
        <h1 class="text-2xl font-semibold mb-6">Welcome Back 👋</h1>

        {/* Stat Cards Row */}
        <div class="flex flex-wrap gap-4">
          <StatCard label="Emails Sent" value="3,245" icon="📧" color="bg-blue-500" />
          <StatCard label="Open Rate" value="52.4%" icon="📈" color="bg-green-500" />
          <StatCard label="Replies" value="127" icon="💬" color="bg-yellow-500" />
          <StatCard label="Conversions" value="24" icon="💸" color="bg-purple-500" />
        </div>
      </main>
    </div>
  );
}
