export default function PostSkeleton() {
  return (
    <div className="flex animate-pulse flex-col rounded-md border-2 border-slate-500 shadow-md shadow-slate-400 transition-transform duration-500 ease-in-out hover:-translate-y-[5%]">
      <div className="flex cursor-pointer flex-col gap-8 p-4">
        <h2 className="h-10 rounded-md bg-slate-500 text-xl"></h2>

        <div className="mb-10 h-32 rounded-md bg-slate-500 text-lg"></div>
      </div>

      <div className="flex flex-wrap justify-around gap-4 p-4">
        <button className="h-10 w-20 rounded-md bg-slate-500 px-2 py-1 text-lg"></button>

        <button className="h-10 w-20 rounded-md bg-slate-500 px-2 py-1 text-lg"></button>
      </div>
    </div>
  );
}
