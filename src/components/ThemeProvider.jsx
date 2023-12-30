"use client";

import { ThemeProvider as ThemeWrapper } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeProvider({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <>{children}</>;

  return <ThemeWrapper attribute="class">{children}</ThemeWrapper>;
}
