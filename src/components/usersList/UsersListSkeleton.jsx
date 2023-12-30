import UserSkeleton from "@/components/user/UserSkeleton";

export default function UsersListSkeleton() {
  return (
    <table className="border-separate border-spacing-2 animate-pulse">
      <thead className="hidden sm:table-header-group">
        <tr>
          <th className="rounded-md bg-slate-500 px-2 py-4"></th>
          <th className="rounded-md bg-slate-500 px-2 py-4"></th>
          <th className="rounded-md bg-slate-500 px-2 py-4"></th>
          <th className="rounded-md bg-slate-500 px-2 py-4"></th>
        </tr>
      </thead>

      <tbody className="grid gap-4 sm:table-row-group">
        <UserSkeleton />
        <UserSkeleton />
        <UserSkeleton />
      </tbody>
    </table>
  );
}
