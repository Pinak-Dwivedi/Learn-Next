"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  async function logout(e) {
    e.target.disabled = true;

    const res = await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();

    if (data?.success) {
      toast.success(data?.message);
      dispatch(setUser(null));
      router.refresh();
      return router.replace("/");
    }

    router.refresh();
    toast.error(data?.message);
    e.target.disabled = false;
  }

  return (
    <button
      className="w-full cursor-pointer rounded-lg bg-zinc-700 p-1 text-center text-slate-100 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-500 md:w-auto"
      onClick={logout}
    >
      SignOut
    </button>
  );
}
