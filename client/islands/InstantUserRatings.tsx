import { h } from "preact";

export default function InstantUserRatings() {
  return (
    <div class="bg-gray-900 py-16 px-8 text-white">
      <h2 class="text-3xl font-bold text-center mb-8">User Ratings</h2>
      <div class="flex justify-around space-x-16">
        {/* Ease of Use */}
        <div class="text-center flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="Ease of Use Icon"
            class="h-16 mb-4"
          />
          <p class="text-lg font-semibold">Ease of Use</p>
          <div class="flex items-center justify-center space-x-2 mt-2">
            <span class="text-2xl font-bold">8.7</span>
            <span class="text-sm text-gray-300">/ 10</span>
          </div>
        </div>

        {/* Quality of Support */}
        <div class="text-center flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/60/60992.png"
            alt="Quality of Support Icon"
            class="h-16 mb-4"
          />
          <p class="text-lg font-semibold">Quality of Support</p>
          <div class="flex items-center justify-center space-x-2 mt-2">
            <span class="text-2xl font-bold">8.5</span>
            <span class="text-sm text-gray-300">/ 10</span>
          </div>
        </div>

        {/* Ease of Setup */}
        <div class="text-center flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25491.png"
            alt="Ease of Setup Icon"
            class="h-16 mb-4"
          />
          <p class="text-lg font-semibold">Ease of Setup</p>
          <div class="flex items-center justify-center space-x-2 mt-2">
            <span class="text-2xl font-bold">8.4</span>
            <span class="text-sm text-gray-300">/ 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
