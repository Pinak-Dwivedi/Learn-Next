import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen p-4">
      <div className="mx-auto flex min-h-[70vh] w-11/12 max-w-5xl flex-col items-center justify-around">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Not Found!
        </h1>

        <div className="sm:text-lg md:text-xl">
          Couldn't find requested resource! 😴
        </div>

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
