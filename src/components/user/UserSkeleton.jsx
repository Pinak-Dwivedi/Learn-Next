export default function UserSkeleton() {
  return (
    <tr className="relative flex flex-col gap-2 rounded-md p-2 odd:bg-slate-200 even:bg-slate-300 dark:odd:bg-slate-700 dark:even:bg-slate-800 sm:table-row sm:p-0 sm:odd:bg-inherit sm:even:bg-inherit ">
      <td className="rounded-l-md">
        <div className="w-1/2 rounded-md bg-slate-500 p-2 sm:w-full"></div>
      </td>

      <td>
        <div className="w-3/5 rounded-md bg-slate-500 p-2 sm:w-full"></div>
      </td>

      <td className="flex justify-center">
        <div className="aspect-square w-24 rounded-full bg-slate-500"></div>
      </td>

      <td className="rounded-r-md">
        <div className="flex flex-wrap justify-around gap-4 p-2 sm:justify-center">
          <button className="rounded-md bg-slate-500 px-8 py-4"></button>

          <button className="rounded-md bg-slate-500 px-8 py-4"></button>
        </div>
      </td>
    </tr>
  );
}
