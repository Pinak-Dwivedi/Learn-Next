"use client";

import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  function handleThemeChange() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  return (
    <div
      className="relative mr-12 flex w-fit cursor-pointer rounded-xl border-2 border-blue-500 min-[300px]:justify-self-end md:mr-0"
      onClick={handleThemeChange}
    >
      <FaMoon />
      <FaSun className="text-orange-500" />
      <div
        className={`absolute min-h-full w-1/2 rounded-full bg-sky-400 transition-transform duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-full" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}
