"use client";

import { useState } from "react";
import { resetPassword } from "@/utils/apiCalls/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setValidationError } from "@/redux/slices/userSlice";
import ValidationError from "@/components/validationError/ValidationError";
import { useRouter } from "next/navigation";

export default function ResetPassword({ token }) {
  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [stopOnSuccess, setStopOnSuccess] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, validationError } = useSelector((state) => state.user);

  async function handleResetPassword(e) {
    e.preventDefault();

    if (stopOnSuccess) return;

    if (isLoading) return;

    dispatch(setIsLoading(true));

    const data = await resetPassword({ ...resetPasswordData, token });

    if (!data.success) {
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
      onSubmit={handleResetPassword}
    >
      <input
        type="password"
        placeholder="Password"
        className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
        value={resetPasswordData.password}
        onChange={(e) =>
          setResetPasswordData({
            ...resetPasswordData,
            password: e.target.value,
          })
        }
      />
      {validationError != null && (
        <ValidationError error={validationError?.password} />
      )}

      <input
        type="password"
        placeholder="Re-enter password"
        className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
        value={resetPasswordData.confirmPassword}
        onChange={(e) =>
          setResetPasswordData({
            ...resetPasswordData,
            confirmPassword: e.target.value,
          })
        }
      />
      {validationError != null && (
        <ValidationError error={validationError?.confirmPassword} />
      )}

      <button
        type="submit"
        className="rounded-md bg-sky-400 px-4 py-2 font-medium hover:bg-blue-500 hover:text-slate-100 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-75 disabled:hover:bg-slate-500 dark:text-slate-100 sm:text-lg"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  );
}
