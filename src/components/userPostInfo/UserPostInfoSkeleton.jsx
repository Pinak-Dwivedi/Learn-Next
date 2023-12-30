import UsersListSkeleton from "../usersList/UsersListSkeleton";

export default function UserPostInfoSkeleton() {
  return (
    <>
      <section className="flex animate-pulse flex-col gap-4 sm:flex-row">
        <div className="flex flex-col justify-around gap-4 rounded-md bg-slate-500 p-2 sm:w-20">
          <h2 className="w-1/5 rounded-sm bg-slate-400 p-2 sm:w-full"></h2>

          <span className="w-3/5 rounded-sm bg-slate-400 p-2 sm:w-full"></span>
        </div>

        <div className="flex flex-col justify-around gap-4 rounded-md bg-slate-500 p-2 sm:w-20">
          <h2 className="w-1/5 rounded-sm bg-slate-400 p-2 sm:w-full"></h2>

          <span className="w-3/5 rounded-sm bg-slate-400 p-2 sm:w-full"></span>
        </div>
      </section>

      {/* last user registered date */}
      <section className="w-3/5 animate-pulse rounded-md bg-slate-500 p-2"></section>

      <UsersListSkeleton />
    </>
  );
}
