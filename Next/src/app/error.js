'use client'

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 text-white px-6">
      <h1 className="text-6xl font-bold text-yellow-400">Oops!</h1>
      <h2 className="mt-4 text-2xl font-semibold">
        Something went wrong
      </h2>

      <p className="mt-2 text-gray-400 text-center max-w-md">
        An unexpected error occurred. Please try again or come back later.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-xl bg-yellow-400 cursor-pointer px-6 py-3 text-sm font-medium text-black hover:bg-yellow-500 transition"
      >
        🔄 Try Again
      </button>
    </div>
  )
}
