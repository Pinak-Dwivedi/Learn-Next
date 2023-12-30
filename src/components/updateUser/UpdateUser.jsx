"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "@/utils/apiCalls/users";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateUser() {
  const { id } = useParams();

  const userQuery = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  });

  const [userData, setUserData] = useState({
    name: null,
    email: null,
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const userMutation = useMutation({
    mutationFn: updateUser,
    onSettled: async (data, error) => {
      if (data != null) {
        toast.success(data?.message);
        router.replace(`/admin/dashboard?${searchParams.toString()}`);
      }

      if (error != null) toast.error(data?.message);

      return await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  function handleUpdate(e) {
    e.preventDefault();
    if (!userQuery.isSuccess) return;

    userMutation.mutate({
      userId: id,
      name: userData.name ?? userQuery.data?.user?.name ?? "",
      email: userData.email ?? userQuery.data?.user?.email ?? "",
    });
  }

  return (
    <div
      className={`mx-auto flex w-11/12 max-w-5xl flex-col gap-4 ${
        userQuery.isLoading ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <h1 className="text-2xl sm:text-4xl">Update User</h1>

      <form
        className="mt-12 flex w-11/12 max-w-md flex-col gap-4 self-center"
        onSubmit={handleUpdate}
      >
        <input
          type="text"
          className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
          placeholder="name"
          value={userData.name ?? userQuery.data?.user?.name ?? ""}
          onChange={(e) =>
            setUserData({
              ...userData,
              name: e.target.value,
            })
          }
        />
        <input
          type="email"
          className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
          placeholder="email"
          value={userData.email ?? userQuery.data?.user?.email ?? ""}
          onChange={(e) =>
            setUserData({
              ...userData,
              email: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="rounded-md bg-sky-400 px-4 py-2 font-medium text-slate-100 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-75 disabled:hover:bg-slate-500 sm:text-lg"
          disabled={userMutation.isPending}
        >
          Update
        </button>
      </form>
    </div>
  );
}
