// components/RatingsSection.tsx
import { Star } from "lucide-react";

const ratings = [
  {
    label: "Ease of Use",
    score: "8.7",
    description: "Email Marketing Average",
  },
  {
    label: "Quality of Support",
    score: "8.5",
    description: "Email Marketing Average",
  },
  {
    label: "Ease of Setup",
    score: "8.4",
    description: "Email Marketing Average",
  },
];

export default function RatingsSection() {
  return (
    <section className="w-full bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {ratings.map((rating, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 border border-gray-200"
          >
            <div className="flex justify-center items-center mb-2">
              <Star className="text-yellow-400 w-6 h-6 mr-1" />
              <span className="text-3xl font-bold text-gray-800">{rating.score}</span>
            </div>
            <p className="text-sm text-gray-600">{rating.label}</p>
            <p className="text-xs text-gray-500">{rating.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
