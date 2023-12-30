"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { deletePost } from "@/utils/apiCalls/posts";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import DeleteDialog from "../deleteDialog/DeleteDialog";

export default function Post({ postData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);
  const { _id: id, title, description } = postData;
  const { user } = useSelector((state) => state.user);

  async function handleDelete() {
    setDisableDelete(true);

    setShowDeleteDialog(false);

    const data = await deletePost(id);

    if (data.success) {
      toast.success(data.message);
      setDisableDelete(false);
      return router.refresh();
    }

    toast.error(data.message);
    setDisableDelete(false);
  }

  return (
    <div className="relative overflow-hidden rounded-md bg-slate-100 shadow-md shadow-slate-400 transition-transform duration-500 ease-in-out hover:-translate-y-[5%] dark:border-2 dark:border-slate-500 dark:bg-slate-900">
      <div
        className="flex h-full cursor-pointer flex-col gap-8 p-4"
        onClick={() => router.push(`/posts/${id}`)}
      >
        <h2 className="break-words text-lg sm:text-xl">{title}</h2>

        <div
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "3",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          // overflow-hidden text-ellipsis whitespace-nowrap
          className="text-md mb-32 sm:text-lg"
        >
          {description}
        </div>
      </div>

      {pathName === "/posts/me" || user?.role === "admin" ? (
        <div className="absolute bottom-0 left-1/2 flex w-3/4 -translate-x-1/2 flex-wrap justify-around gap-4 pb-4">
          <Link
            href={`/posts/update/${id}?${searchParams.toString()}`}
            className="text-md rounded-md bg-sky-400 px-2 py-1 text-slate-100 hover:bg-blue-500 sm:text-lg"
          >
            UPDATE
          </Link>

          <button
            className="text-md rounded-md bg-red-600 px-2 py-1 text-slate-100 hover:bg-red-500 sm:text-lg"
            onClick={() => setShowDeleteDialog(true)}
            disabled={disableDelete}
          >
            DELETE
          </button>
        </div>
      ) : (
        ""
      )}

      {pathName === "/posts/me" || user?.role === "admin" ? (
        <DeleteDialog
          message={"⚠️ Are you sure you want to delete this post!"}
          showDeleteDialog={showDeleteDialog}
          setShowDeleteDialog={setShowDeleteDialog}
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}
    </div>
  );
}
