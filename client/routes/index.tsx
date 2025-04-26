import { Head } from "$fresh/runtime.ts";
import SendEmail from "../islands/SendEmail.tsx";
import Header from "../islands/Header.tsx";

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
              Send <span class="text-yellow-400">Better Emails. <br /> </span> Get <span class="text-yellow-400">More Replies.🚀</span>
                <br />
            </h2>

            <p class="text-lg text-gray-300">
             Simple cold email tool to help creators and agencies reach leads, follow up automatically, and land in inboxes.
            </p>

            <ul class="space-y-2 text-gray-200">
              <li>✅ <span class="font-semibold">Upload your CSV, write your email, hit send</span></li>
              <li>✅ <span class="font-semibold">Personalize every message (with {"{"}{"{"}name{"}"}{"}"})</span></li>
              <li>✅ <span class="font-semibold">Auto-follow-ups, no complicated setup</span></li>
              <li>✅ <span class="font-semibold">Built for fast testing and quick wins</span></li>
            </ul>
          </section>

          {/* Right Form */}
          <section class="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
            <SendEmail />
          </section>
        </main>
      </div>
    </>

  );
}
