
import { h } from "preact";

type StatCardProps = {
  label: string;
  value: string;
  icon?: string;
  color?: string;
};

export default function StatCard({ label, value, icon, color = "bg-blue-500" }: StatCardProps) {
  return (
    <div class="bg-white shadow-md rounded-xl p-4 w-full md:w-1/4">
      <div class="flex items-center space-x-4">
        {icon && (
          <div class={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color}`}>
            <span>{icon}</span>
          </div>
        )}
        <div>
          <p class="text-sm text-gray-500">{label}</p>
          <p class="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
