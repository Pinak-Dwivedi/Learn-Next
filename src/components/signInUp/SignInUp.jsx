"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setIsLoading,
  setValidationError,
} from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginUser, signUpUser } from "@/utils/apiCalls/users";
import ValidationError from "@/components/validationError/ValidationError";

export default function SignInUp() {
  const [rightPanelActive, setRightPanelActive] = useState(0);
  const [stopOnSuccess, setStopOnSuccess] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handlePandelSwitch() {
    dispatch(setValidationError(null));

    setRightPanelActive((prev) => !prev);
  }

  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, validationError, user } = useSelector(
    (state) => state.user,
  );

  async function handleLogin(e) {
    e.preventDefault();

    if (stopOnSuccess) return;

    if (isLoading) return;

    dispatch(setIsLoading(true));

    const data = await loginUser(loginData);

    if (data?.success) {
      toast.success(data?.message);
      dispatch(setValidationError(null));
      dispatch(setUser(data?.user));
      setStopOnSuccess(true);
      dispatch(setIsLoading(false));

      router.refresh();
      return router.replace("/posts");
    }

    if (data?.validationError != null)
      dispatch(setValidationError(data?.validationError));
    else dispatch(setValidationError(null));

    toast.error(data?.message);
    if (user != null) dispatch(setUser(null));
    dispatch(setIsLoading(false));
  }

  async function handleSignUp(e) {
    e.preventDefault();

    if (isLoading) return;

    dispatch(setIsLoading(true));

    const data = await signUpUser(signupData);

    if (data?.success) {
      toast.success(data?.message);
      dispatch(setValidationError(null));
      dispatch(setUser(data?.user));
      setStopOnSuccess(true);
      dispatch(setIsLoading(false));

      router.refresh();
      return router.replace("/posts");
    }

    if (data?.validationError != null)
      dispatch(setValidationError(data?.validationError));
    else dispatch(setValidationError(null));

    toast.error(data?.message);
    if (user != null) dispatch(setUser(null));
    dispatch(setIsLoading(false));
  }

  return (
    <>
      <div className="flex items-center justify-around gap-4 max-[230px]:flex-col sm:gap-0">
        <button
          className={`w-max px-4 py-2 outline-none hover:text-slate-400 sm:text-lg ${
            rightPanelActive
              ? ""
              : "border-b-2 border-b-slate-500 dark:border-b-slate-100"
          }`}
          onClick={() => {
            if (rightPanelActive) handlePandelSwitch();
          }}
        >
          Sign In
        </button>
        <button
          className={`w-max px-4 py-2 outline-none hover:text-slate-400 sm:text-lg ${
            rightPanelActive
              ? "border-b-2 border-b-slate-500 dark:border-b-slate-100"
              : ""
          }`}
          onClick={() => {
            if (!rightPanelActive) handlePandelSwitch();
          }}
        >
          Sign Up
        </button>
      </div>

      <div
        className={`relative min-h-screen w-[200%] transition-transform duration-700 ${
          rightPanelActive ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >
        <div
          className={`absolute flex min-h-screen w-1/2 flex-col items-center gap-8 px-4 py-8 transition-opacity duration-500 ease-in-out ${
            rightPanelActive ? "opacity-0" : "opacity-100"
          }`}
        >
          <h1 className="self-start text-2xl sm:text-3xl">Sign In</h1>

          <form
            className="flex w-full max-w-sm flex-col gap-4"
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Email"
              className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />
            {validationError != null && (
              <ValidationError error={validationError?.email} />
            )}

            <input
              type="password"
              placeholder="Password"
              className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />
            {validationError != null && (
              <ValidationError error={validationError?.password} />
            )}

            <Link
              href="/forgot-password"
              className="self-end text-sm hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300"
            >
              forgot your password?
            </Link>

            <button
              type="submit"
              className="rounded-md bg-sky-400 px-4 py-2 font-medium text-slate-100 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-75 disabled:hover:bg-slate-500 sm:text-lg"
              disabled={isLoading}
            >
              SIGN IN
            </button>
          </form>
        </div>

        <div
          className={`absolute left-1/2 flex min-h-screen w-1/2 flex-col items-center gap-8 transition-opacity duration-500 ease-in-out ${
            rightPanelActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="self-start text-2xl sm:text-3xl">Sign Up</h1>

          <form
            className="flex w-full max-w-sm flex-col gap-4"
            onSubmit={handleSignUp}
          >
            <input
              type="text"
              placeholder="Name"
              className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
              value={signupData.name}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  name: e.target.value,
                })
              }
            />
            {validationError != null && (
              <ValidationError error={validationError?.name} />
            )}

            <input
              type="email"
              placeholder="Email"
              className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  email: e.target.value,
                })
              }
            />
            {validationError != null && (
              <ValidationError error={validationError?.email} />
            )}

            <input
              type="password"
              placeholder="Password"
              className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  password: e.target.value,
                })
              }
            />
            {validationError != null && (
              <ValidationError error={validationError?.password} />
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              className="rounded p-2 font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100 sm:text-lg"
              value={signupData.confirmPassword}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  confirmPassword: e.target.value,
                })
              }
            />
            {validationError != null && (
              <ValidationError error={validationError?.confirmPassword} />
            )}

            <button
              type="submit"
              className="rounded-md bg-sky-400 px-4 py-2 font-medium text-slate-100 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-75 disabled:hover:bg-slate-500 sm:text-lg"
              disabled={isLoading}
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
