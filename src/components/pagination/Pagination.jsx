"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Pagination({ paginationData }) {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams());
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const totalPosts = paginationData?.totalPosts;
  const perPage = paginationData?.perPage;

  if (totalPosts == null || perPage == null) return "";

  const pageNumbers = Array(Math.ceil(totalPosts / perPage))
    .fill(0)
    .map((_, index) => index + 1);

  // const pageNumbers1 = [
  //   ...Array(Math.ceil(totalPosts / perPage) + 1).keys(),
  // ].slice(1);

  const router = useRouter();

  function handlePrev() {
    if (currentPage > 1) {
      let newPageNumber = currentPage - 1;

      searchParams.set("page", newPageNumber);

      return router.replace(`${pathname}?${searchParams.toString()}`);
    }

    return;
  }

  function handleNext() {
    if (currentPage < pageNumbers.length) {
      let newPageNumber = currentPage + 1;

      searchParams.set("page", newPageNumber);

      return router.replace(`${pathname}?${searchParams.toString()}`);
    }
    return;
  }

  function handleNum(num) {
    searchParams.set("page", num);

    return router.replace(`${pathname}?${searchParams.toString()}`);
  }

  return (
    <section className="col-span-full mt-12 p-4">
      <div className="mx-auto flex w-11/12 max-w-5xl flex-wrap justify-center gap-1">
        <button
          className="rounded-md bg-sky-400 px-3 py-1 text-lg font-semibold text-slate-100 transition-transform hover:scale-95 hover:bg-blue-500"
          onClick={handlePrev}
        >
          &#60;
        </button>

        {pageNumbers.map((pageNumber, i) => (
          <button
            key={i}
            className={`rounded-md px-4 font-semibold transition-transform hover:scale-95 hover:bg-blue-500 ${
              currentPage === pageNumber
                ? "bg-blue-500 text-slate-100"
                : "bg-none"
            }`}
            onClick={() => handleNum(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="rounded-md bg-sky-400 px-3 py-1 text-lg font-semibold text-slate-100 transition-transform hover:scale-95 hover:bg-blue-500"
          onClick={handleNext}
        >
          &#62;
        </button>
      </div>
    </section>
  );
}
