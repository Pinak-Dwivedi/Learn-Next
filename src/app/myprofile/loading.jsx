export default function Loading() {
  return (
    <section className="min-h-screen animate-pulse p-4">
      <div className="mx-auto mt-8 w-11/12 max-w-5xl">
        <form className="flex w-full flex-col gap-12 sm:flex-row">
          <div className="flex w-full flex-col items-center gap-4 sm:w-3/5">
            <div className="group aspect-square w-1/2 overflow-hidden rounded-full bg-slate-500"></div>

            <div className="flex w-1/3 flex-col gap-2">
              <h2 className="h-4 w-full rounded-md bg-slate-500 text-lg font-medium text-slate-500 sm:text-xl"></h2>

              <h3 className="h-3 w-full rounded-md bg-slate-500 font-medium text-slate-500 sm:text-lg"></h3>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 self-center sm:w-2/5">
            <p className="h-10 w-full rounded-md bg-slate-500 p-2 text-lg font-medium outline-none focus:border-2"></p>

            <p className="h-10 w-full rounded-md bg-slate-500 p-2 text-lg font-medium outline-none focus:border-2"></p>

            <p className="h-10 w-full rounded-md bg-slate-500 p-2 text-lg font-medium outline-none focus:border-2"></p>
          </div>
        </form>
      </div>
    </section>
  );
}
