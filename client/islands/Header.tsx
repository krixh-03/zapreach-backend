export default function Header() {
  return (
    <header class="relative bg-gray-800 text-white p-4 flex justify-between items-center">
      <div class="font-sans font-semibold">Zapreach</div>
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
