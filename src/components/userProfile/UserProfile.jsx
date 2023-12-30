"use client";

import { useState } from "react";
import Image from "next/image";
import { updateUser } from "@/utils/apiCalls/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setValidationError,
  setUser,
} from "@/redux/slices/userSlice";
import ValidationError from "../validationError/ValidationError";
import { FaUserCircle } from "react-icons/fa";

export default function UserProfile({ userInfo }) {
  const [userData, setUserData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    profilePic: userInfo?.profilePic,
  });

  const dispatch = useDispatch();
  const { isLoading, validationError } = useSelector((state) => state.user);

  let profileImage;

  if (userData.profilePic == null) profileImage = null;
  else if (typeof userData.profilePic === "object") {
    profileImage = URL.createObjectURL(userData.profilePic);
  }

  if (profileImage == null && userInfo?.profilePic != null) {
    profileImage = userInfo?.profilePic;
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (isLoading) return;
    dispatch(setIsLoading(true));

    try {
      const userId = userInfo?.id;
      const data = await updateUser({ userId, ...userData });

      toast.success(data?.message);
      dispatch(setValidationError(null));
      dispatch(setUser(data?.user));
      dispatch(setIsLoading(false));
    } catch (error) {
      toast.error(data?.message);

      if (data?.validationError != null)
        dispatch(setValidationError(data?.validationError));
      else dispatch(setValidationError(null));

      dispatch(setIsLoading(false));
    }
  }

  return (
    <section className="min-h-screen p-4">
      <div className="mx-auto mt-8 w-11/12 max-w-5xl">
        <form className="flex w-full flex-col gap-12 sm:flex-row">
          <div className="flex w-full flex-col items-center gap-4 sm:w-3/5">
            <div className="group relative aspect-square w-1/2 overflow-hidden rounded-full">
              {/* <Image
                src={"https://source.unsplash.com/random/?face"}
                fill
                sizes="100"
                alt="winter"
                className="object-cover"
              /> */}

              {profileImage != null ? (
                <Image
                  src={profileImage}
                  fill
                  sizes="100"
                  alt="winter"
                  className="object-cover"
                />
              ) : (
                <FaUserCircle className="h-full w-full rounded-full text-sky-400 group-hover:text-blue-500" />
              )}

              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                className="absolute top-0 z-10 h-full w-full opacity-0 file:h-full file:w-full file:cursor-pointer file:rounded-full"
                title=""
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profilePic: e.target.files[0],
                  })
                }
              />
            </div>
            {validationError != null && (
              <ValidationError error={validationError?.profilePic} />
            )}

            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium text-slate-500 sm:text-xl">
                {userData.name}
              </h2>
              <h3 className="font-medium text-slate-500 sm:text-lg">
                {userData.email}
              </h3>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 self-center sm:w-2/5">
            <input
              type="text"
              value={userData.name}
              className="rounded p-2 text-lg font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  name: e.target.value,
                })
              }
            />
            {validationError != null && (
              <ValidationError error={validationError?.name} />
            )}

            <input
              type="email"
              value={userData.email}
              className="rounded p-2 text-lg font-medium outline-none focus:border-2 dark:bg-slate-700 dark:text-slate-100"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  email: e.target.value,
                })
              }
            />
            {validationError != null && (
              <ValidationError error={validationError?.email} />
            )}

            <button
              type="submit"
              className="justify-self-center rounded-md bg-sky-400 px-4 py-2 text-lg font-medium text-slate-100 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-75 disabled:hover:bg-slate-500"
              disabled={isLoading}
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
