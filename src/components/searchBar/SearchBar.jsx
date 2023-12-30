"use client";

import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchActive, setSearchActive] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams());
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();

    if (search?.trim() === "") return;

    searchParams.set("q", search.trim());

    return router.replace(`${pathname}?${searchParams.toString()}`);
  }

  return (
    <section
      className={`rounded-md ${
        searchActive
          ? "bg-slate-200 dark:bg-slate-100"
          : "bg-slate-300 hover:bg-slate-200 dark:bg-slate-700 hover:dark:bg-slate-600"
      }`}
    >
      <form className="flex">
        <input
          type="search"
          placeholder="Search"
          value={search}
          className={`w-full bg-inherit p-2 outline-none ${
            searchActive ? "text-slate-900" : "text-slate-500"
          }`}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSearchActive(true)}
          onBlur={() => setSearchActive(false)}
        />

        <button
          type="submit"
          className="group cursor-pointer p-1"
          onClick={handleSearch}
        >
          <FaSearch
            className={`text-xl ${
              searchActive
                ? "text-slate-500 group-hover:text-blue-500"
                : "text-slate-400"
            }`}
          />
        </button>
      </form>
    </section>
  );
}
