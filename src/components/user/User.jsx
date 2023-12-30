"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import DeleteDialog from "../deleteDialog/DeleteDialog";
import { FaUserCircle } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/utils/apiCalls/users";
import toast from "react-hot-toast";

export default function User({ userInfo }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const searchParams = useSearchParams();

  const queryClient = useQueryClient();

  const userDeleteMutation = useMutation({
    mutationFn: deleteUser,
    onSettled: async (data, error) => {
      if (data != null) toast.success(data?.message);

      if (error != null) toast.error(data?.message);

      return await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  function handleDelete() {
    userDeleteMutation.mutate(userInfo.id);
  }

  return (
    <tr
      className={`relative flex flex-col gap-2 rounded-md p-2 odd:bg-slate-200 even:bg-slate-300 dark:odd:bg-slate-700 dark:even:bg-slate-800 sm:table-row sm:p-0 ${
        userDeleteMutation.isPending ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <td className="rounded-l-md before:mr-2 before:font-semibold before:content-['Name:'] dark:before:text-slate-400 sm:text-center sm:before:content-['']">
        {userInfo.name}
      </td>

      <td className="break-all before:mr-2 before:font-semibold before:content-['Email:'] dark:before:text-slate-400 sm:text-center sm:before:content-['']">
        {userInfo.email}
      </td>

      <td className="flex justify-center">
        <div className="relative aspect-square w-24 overflow-hidden rounded-full sm:mx-auto sm:w-3/4">
          {userInfo.profilePic != null ? (
            <Image
              src={userInfo.profilePic}
              fill
              sizes="100"
              alt="user profile"
              priority
              className="object-cover"
            />
          ) : (
            <FaUserCircle className="h-full w-full rounded-full text-sky-400 group-hover:text-blue-500" />
          )}
        </div>
      </td>

      <td className={`${!showDeleteDialog ? "rounded-r-md" : ""}`}>
        <div className="flex flex-wrap justify-around gap-4 p-2 sm:justify-center">
          <Link
            href={`/admin/user/${userInfo?.id}?${searchParams.toString()}`}
            className="rounded-md bg-sky-400 px-4 py-1 text-slate-100 hover:bg-blue-500"
          >
            Edit
          </Link>
          <button
            className="rounded-md bg-red-600 px-4 py-1 text-slate-100 hover:bg-red-500"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete
          </button>
        </div>
      </td>

      <td
        className={`bg-inherit ${showDeleteDialog ? "table-cell" : "hidden"}`}
      >
        <DeleteDialog
          message={"⚠️ Are you sure you want to delete this user!"}
          showDeleteDialog={showDeleteDialog}
          setShowDeleteDialog={setShowDeleteDialog}
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
}
