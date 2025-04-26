import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import SendEmail from "../islands/SendEmail.tsx";
import Header from "../islands/Header.tsx";
import InstantUserRatings from "../islands/InstantUserRatings.tsx"; // Import the new component

export default function Home() {
  return (

    <>
      <Head>
        <title>Zapreach - Cold Email Automation</title>
      </Head>

      <div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 text-white">
        {/* Header Component */}
        <Header />

        {/* Main Content */}
        <main class="flex-1 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-8 py-16">
          {/* Left Section */}
          <section class="space-y-6">
            <h2 class="text-5xl font-extrabold leading-snug text-white">
              Discover, <span class="text-yellow-400">Connect</span> & Convert
              <br />
              <span class="text-yellow-500">Your Perfect Clients 🚀</span>
            </h2>

            <p class="text-lg text-gray-300">
              Quickly identify potential clients, enhance your email outreach,
              ensure inbox placement, and increase your success with AI-driven tools.
            </p>

            <ul class="space-y-2 text-gray-200">
              <li>✅ <span class="font-semibold">Effortlessly Find Warm Leads</span></li>
              <li>✅ <span class="font-semibold">Scale Campaigns with Ease</span></li>
              <li>✅ <span class="font-semibold">Land in Primary Inbox</span></li>
              <li>✅ <span class="font-semibold">Amplify Results with AI</span></li>
            </ul>
          </section>

          {/* Right Form */}
          <section class="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
            <SendEmail />
          </section>
        </main>

        {/* Instant User Ratings Section */}
        <InstantUserRatings /> {/* Add the new island here */}
      </div>
       <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Zapreach</h1>
        <SendEmail />
    </div>
    </>

  );
}
