import { cookies } from "next/headers";
import { getUserInfo } from "@/utils/apiCalls/users";
import LinksList from "./LinksList";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import SetAuthClient from "./SetAuthClient";

export default async function Header() {
  const data = await getUserInfo(cookies());

  return (
    <header className="">
      <nav className="relative mx-auto grid max-w-5xl items-center gap-4 border-b-2 border-b-zinc-600 p-4 shadow-sm shadow-slate-400/30 min-[300px]:grid-cols-2 md:flex md:shadow-none">
        <Link href="/" className="relative justify-self-start md:mr-auto">
          <span className="hidden rounded-md bg-sky-400 p-2 text-lg text-slate-100 hover:bg-blue-500 sm:inline">
            LEARN-NEXT
          </span>
          <Image
            src={logo}
            alt="Learn-Next logo"
            className="inline aspect-square w-8 object-cover sm:hidden"
          />
        </Link>

        <ThemeSwitcher />

        {data?.user != null && <SetAuthClient user={data?.user} />}

        <LinksList />
      </nav>
    </header>
  );
}
