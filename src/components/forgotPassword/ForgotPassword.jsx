"use client";

import { useState } from "react";
import { forgotPassword } from "@/utils/apiCalls/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setValidationError, setIsLoading } from "@/redux/slices/userSlice";
import ValidationError from "@/components/validationError/ValidationError";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [stopOnSuccess, setStopOnSuccess] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, validationError } = useSelector((state) => state.user);

  async function handleForgotPassword(e) {
    e.preventDefault();

    if (stopOnSuccess) return;

    if (isLoading) return;

    dispatch(setIsLoading(true));

    const data = await forgotPassword({ email });

    if (!data?.success) {
      toast.error(data?.message);

      if (data?.validationError != null)
        dispatch(setValidationError(data?.validationError));
      else dispatch(setValidationError(null));

      dispatch(setIsLoading(false));
      return;
    }

    toast.success(data?.message);
    dispatch(setValidationError(null));
    setStopOnSuccess(true);
    dispatch(setIsLoading(false));

    return router.replace("/");
  }

  return (
    <form
      className="mx-auto flex w-11/12 max-w-sm flex-col gap-4"
      onSubmit={handleForgotPassword}
    >
      <input
        type="email"
        placeholder="Email"
        className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {validationError != null && (
        <ValidationError error={validationError?.email} />
      )}

      <button
        type="submit"
        className="rounded-md bg-sky-400 px-4 py-2 font-medium hover:bg-blue-500 hover:text-slate-100 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-75 disabled:hover:bg-slate-500 dark:text-slate-100 sm:text-lg"
        disabled={isLoading}
      >
        Send Mail
      </button>
    </form>
  );
}
