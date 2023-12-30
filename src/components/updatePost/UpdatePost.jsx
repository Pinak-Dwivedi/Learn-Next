"use client";

import { useState } from "react";

import { updatePost } from "@/utils/apiCalls/posts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setValidationError } from "@/redux/slices/postsSlice";
import ValidationError from "../validationError/ValidationError";

export default function UpdatePost({ id, title, description }) {
  const [postData, setPostData] = useState({
    title,
    description,
  });

  const [stopOnSuccess, setStopOnSuccess] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const { isLoading, validationError } = useSelector((state) => state.posts);

  async function handleUpdatePost(e) {
    e.preventDefault();

    if (stopOnSuccess) return;

    if (isLoading) return;

    dispatch(setIsLoading(true));

    const data = await updatePost({ id, ...postData });

    if (data?.success) {
      toast.success(data?.message);

      setStopOnSuccess(true);
      dispatch(setValidationError(null));
      dispatch(setIsLoading(false));

      router.refresh();
      return router.back();
    }

    toast.error(data?.message);

    if (data?.validationError != null)
      dispatch(setValidationError(data?.validationError));
    else dispatch(setValidationError(null));

    dispatch(setIsLoading(false));
  }

  return (
    <section className="min-h-screen p-4">
      <h1 className="text-2xl sm:text-4xl">UPDATE POST</h1>

      <form
        className="mx-auto mt-12 flex w-11/12 max-w-xl flex-col gap-4"
        onSubmit={handleUpdatePost}
      >
        <input
          type="text"
          placeholder="Title"
          value={postData.title}
          onChange={(e) =>
            setPostData({
              ...postData,
              title: e.target.value,
            })
          }
          className="rounded p-2 text-lg font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100"
        />
        {validationError != null && (
          <ValidationError error={validationError?.title} />
        )}

        <textarea
          type="text"
          placeholder="Description"
          rows={5}
          value={postData.description}
          onChange={(e) =>
            setPostData({
              ...postData,
              description: e.target.value,
            })
          }
          className="rounded p-2 text-lg font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100"
        ></textarea>
        {validationError != null && (
          <ValidationError error={validationError?.description} />
        )}

        <button
          type="submit"
          className="self-end rounded-md bg-sky-400 px-4 py-2 text-lg font-medium text-slate-100 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-75 disabled:hover:bg-slate-500"
          disabled={isLoading}
        >
          Update
        </button>
      </form>
    </section>
  );
}
