"use client";

import { useState } from "react";
import LinkWrapper from "./LinkWrapper";
import Logout from "./Logout";
import Hamburger from "./Hamburger";

export default function LinksList({ authState, isAdmin }) {
  const [navOpen, setNavOpen] = useState(false);

  const navigationLinks = [
    { url: "/about", label: "About" },
    { url: "/admin/dashboard", label: "Dashboard", authState: isAdmin },
    { url: "/posts", label: "Posts", authState },
    { url: "/posts/me", label: "My Posts", authState },
    { url: "/myprofile", label: "My Profile", authState },
    { url: "/login", label: "SignIn" },
  ];

  function handleNavOpen() {
    setNavOpen((prev) => !prev);
  }

  const linksLength = navigationLinks.filter((link) => {
    if (link.authState != null) return link.authState === true;

    return true;
  }).length;

  // 3 rem per element
  // const heightClass = authState ? "h-[18rem]" : "h-[6rem]";
  const heightClass = `h-[${linksLength * 3}rem]`;

  return (
    <>
      <ul
        className={`flex flex-col flex-wrap items-center gap-4 overflow-hidden transition-[height] duration-500 ease-in-out min-[300px]:col-span-2 md:h-full md:flex-row ${
          navOpen ? `${heightClass}` : "h-0"
        }`}
      >
        {navigationLinks.map((link, i) => {
          if (link.authState === false) return null;

          return (
            <li key={i} className="w-full md:w-auto">
              {link.url === "/login" ? (
                authState ? (
                  <Logout />
                ) : (
                  <LinkWrapper
                    path={link.url}
                    text={link.label}
                    style={
                      "block w-full rounded-lg bg-zinc-700 p-1 text-center text-slate-100 hover:bg-zinc-800 md:w-auto"
                    }
                  />
                )
              ) : (
                <LinkWrapper
                  path={link.url}
                  text={link.label}
                  style={
                    "block w-full rounded-lg p-1 text-center outline-none hover:bg-sky-400 hover:text-slate-100 md:inline"
                  }
                />
              )}
            </li>
          );
        })}
      </ul>

      <Hamburger handleNavOpen={handleNavOpen} />
    </>
  );
}
