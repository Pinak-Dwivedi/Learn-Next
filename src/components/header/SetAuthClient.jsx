"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

export default function SetAuthClient({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user != null) {
      dispatch(setUser(user));
    }
  }, []);

  return null;
}
