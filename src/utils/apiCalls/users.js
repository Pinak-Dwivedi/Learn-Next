import getRequestHeaders from "@/lib/getRequestHeaders";
import convertFileToBase64 from "@/lib/convertFileToBase64";

const SERVER_URL = process.env.SERVER_URL;

export async function getUserInfo(cookies) {
  const res = await fetch(`${SERVER_URL}/api/auth`, {
    method: "GET",
    headers: getRequestHeaders(cookies),
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  return data;
}

// client side api calls
export async function loginUser(loginData) {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify(loginData),
  });

  const data = await res.json();

  return data;
}

export async function signUpUser(signUpData) {
  const res = await fetch("/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify(signUpData),
  });

  const data = await res.json();

  return data;
}

export async function getUsers() {
  const res = await fetch("/api/users", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (data?.success) return data;

  throw data;
}

export async function getUser(userId) {
  const res = await fetch(`/api/users/${userId}`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (data?.success) return data;

  throw data;
}

export async function updateUser(userData) {
  const { userId, name, email, profilePic } = userData;

  let imageInBase64;

  if (profilePic != null && typeof profilePic === "object") {
    imageInBase64 = await convertFileToBase64(profilePic);
  }

  const res = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify({ name, email, profilePic: imageInBase64 }),
  });

  const data = await res.json();

  if (data?.success) return data;

  throw data;
}

export async function deleteUser(userId) {
  const res = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (data?.success) return data;

  throw data;
}

export async function forgotPassword(userData) {
  const { email } = userData;

  const res = await fetch(`/api/users/forgot-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  return data;
}

export async function resetPassword(userData) {
  const { password, confirmPassword, token } = userData;

  const res = await fetch(`/api/users/reset-password/${token}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, confirmPassword }),
  });

  const data = await res.json();

  return data;
}
