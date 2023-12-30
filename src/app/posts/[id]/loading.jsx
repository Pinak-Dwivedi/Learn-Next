export default function Loading() {
  return (
    <section className="p4 min-h-screen animate-pulse">
      <div className="mx-auto flex min-h-screen w-11/12 max-w-6xl flex-col gap-8">
        <div className="relative aspect-video w-3/4 self-center overflow-hidden rounded-md bg-slate-500"></div>

        <h1 className="h-5 w-1/3 rounded-md bg-slate-500 text-2xl font-bold sm:text-3xl md:text-4xl"></h1>

        <div className="flex flex-col gap-2 rounded-md">
          {Array(6)
            .fill(1)
            .map((_, i) => (
              <p key={i} className="h-2 rounded-sm bg-slate-500"></p>
            ))}
        </div>
      </div>
    </section>
  );
}
