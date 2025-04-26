"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6">
      <main className="flex flex-col items-center text-center space-y-6">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={40}
          className="dark:invert"
          priority
        />

        <h1 className="text-4xl font-bold">Welcome to Auth App 🚀</h1>
        <p className="text-lg text-gray-300 max-w-md">
          A simple and secure authentication system built with Next.js 14.
        </p>

        <div className="flex gap-6 mt-6 flex-col sm:flex-row">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all w-full sm:w-auto"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all w-full sm:w-auto"
          >
            Signup
          </button>
        </div>
      </main>

      <footer className="mt-16 text-sm text-gray-500">
        © 2025 Auth App. Built with ❤️ using Next.js
      </footer>
    </div>
  );
}
