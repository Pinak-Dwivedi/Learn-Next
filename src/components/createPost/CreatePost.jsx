"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { createPost } from "@/utils/apiCalls/posts";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setValidationError } from "@/redux/slices/postsSlice";
import ValidationError from "../validationError/ValidationError";

export default function CreatePost() {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });
  const [stopOnSuccess, setStopOnSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const { isLoading, validationError } = useSelector((state) => state.posts);

  async function handleCreatePost(e) {
    e.preventDefault();

    if (stopOnSuccess) return;

    if (isLoading) return;

    dispatch(setIsLoading(true));

    const data = await createPost(postData);

    if (data?.success) {
      toast.success(data.message);

      setStopOnSuccess(true);
      dispatch(setValidationError(null));
      dispatch(setIsLoading(false));

      router.refresh();
      return router.replace(`/posts/me?${searchParams.toString()}`);
    }

    toast.error(data.message);

    if (data?.validationError != null)
      dispatch(setValidationError(data?.validationError));
    else dispatch(setValidationError(null));

    dispatch(setIsLoading(false));
  }

  return (
    <form
      className="mx-auto mt-12 flex w-11/12 max-w-xl flex-col gap-4"
      onSubmit={handleCreatePost}
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
        className="self-end rounded-md bg-sky-400 px-4 py-2 text-lg font-medium text-slate-100 hover:bg-blue-500"
        disabled={isLoading}
      >
        Create
      </button>
    </form>
  );
}
