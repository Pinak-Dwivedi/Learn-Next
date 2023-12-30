"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LinkWrapper({ path, text, style }) {
  const pathname = usePathname();

  const isActivePath = pathname === path;

  if (path === "/")
    return (
      <Link href={path} className={`${style} block md:inline`}>
        {text}
      </Link>
    );

  return (
    <Link
      href={path}
      className={`${style} ${isActivePath ? "bg-blue-500 text-slate-100" : ""}`}
    >
      {text}
    </Link>
  );
}
