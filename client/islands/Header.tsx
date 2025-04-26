import LoginModal from "../islands/LoginModal.tsx";  // If you want the login modal in the header

export default function Header() {
  return (
    <header class="w-full px-6 py-4 border-b border-base-300 bg-base-100 flex justify-center items-center">
      <div class="flex justify-between w-full max-w-7xl">
        <h1 class="text-xl font-bold text-primary mt-2 font-sans">Zapreach</h1>

        {/* Navigation Menu */}
        <div class="flex space-x-6 items-center">
          {/* <a href="/product" class="text-base-content hover:text-blue-600 transition">Product</a>
          <a href="/resources" class="text-base-content hover:text-blue-600 transition">Resources</a>
          <a href="/pricing" class="text-base-content hover:text-blue-600 transition">Pricing</a> */}
          
          {/* Login and Signup Buttons */}
          {/* <LoginModal /> */}
          
          {/* <a
            href="/start-free-trial"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Start Free Trial
          </a>
          <a
            href="/book-a-call"
            class="bg-transparent text-blue-600 border-2 border-blue-600 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition"
          >
            Book a Call
          </a> */}
        </div>
      </div>
    </header>
  );
}
