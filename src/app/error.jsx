"use client";

import Link from "next/link";

export default function ErrorComponent({ error, reset }) {
  return (
    <section className="min-h-screen p-4">
      <div className="mx-auto flex min-h-[70vh] w-11/12 max-w-5xl flex-col items-center justify-around">
        <h1 className="text-3xl font-bold text-red-500 sm:text-4xl md:text-5xl">
          ⚠️ {error.message}
        </h1>

        <button
          onClick={reset}
          className="rounded-md bg-sky-400 p-3 font-semibold text-slate-100 hover:bg-blue-500 sm:text-lg"
        >
          Click To Try Again!
        </button>
        {/* <button
          type="submit"
          className="rounded-md bg-sky-400 px-4 py-2 font-medium text-slate-100 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-75 disabled:hover:bg-slate-500 sm:text-lg"
          disabled={userMutation.isPending}
        ></button> */}

        <Link
          href="/"
          className="rounded-md bg-sky-400 p-3 font-semibold text-slate-100 hover:bg-blue-500 sm:text-lg"
        >
          Back To Home
        </Link>
      </div>
    </section>
  );
}
