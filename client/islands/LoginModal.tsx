
import { h } from "preact";
import { useState } from "preact/hooks";

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <button
        class="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-md shadow hover:bg-gray-800 transition"
        onClick={() => setOpen(true)}
      >
        Login
      </button>

      {open && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
            <button
              class="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Welcome Back</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
              class="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
              class="w-full p-3 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div class="flex justify-between items-center text-sm mb-4">
              <label class="flex items-center">
                <input type="checkbox" class="mr-2" />
                Remember Me
              </label>
              <a href="#" class="text-blue-500 hover:underline">Forgot Password?</a>
            </div>
            <button class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </div>
        </div>
      )}
    </>
  );
}
