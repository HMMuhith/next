'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-900 to-black text-white px-6">
      <h1 className="text-8xl font-extrabold text-red-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-400 text-center max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-red-500 px-6 py-3 text-sm font-medium text-white hover:bg-red-600 transition"
      >
        ⬅ Go Back Home
      </Link>
    </div>
  )
}
