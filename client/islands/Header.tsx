export default function Header() {
  return (
    <header class="relative bg-gray-800 text-white p-4 flex justify-between items-center">
      <div class="flex items-center">
        <img src="/icon3.png" alt="app logo" class="w-10 h-10 mr-1" />
        <span class="font-sans font-semibold ml-1 text-3xl">Zapreach</span>
      </div>
      <nav>{/* Your nav links */}</nav>

      {/* Mobile button: absolute in header, visible only on small screens */}
      <a
        href="/feedback"
        class="absolute top-4 right-4 bg-yellow-500 text-black rounded-full px-3 py-2 shadow-lg hover:bg-yellow-600 hover:scale-105 transition-transform text-xs md:hidden"
      >
        Give Feedback
      </a>
    </header>
  );
}
