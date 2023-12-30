import getRequestHeaders from "@/lib/getRequestHeaders";

const SERVER_URL = process.env.SERVER_URL;

// get single post
export async function getPost(id, cookies) {
  const res = await fetch(`${SERVER_URL}/api/posts/${id}`, {
    method: "GET",
    headers: getRequestHeaders(cookies),
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (res.status === 404) return data;

  if (!data?.success) throw new Error(data?.message);

  return data;
}

// get all posts
export async function getPosts(query = "", cookies) {
  const res = await fetch(`${SERVER_URL}/api/posts?${query}`, {
    method: "GET",
    headers: getRequestHeaders(cookies),
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  // no posts found
  if (!data?.success && "posts" in data) return data;

  if (!data?.success) throw new Error(data?.message);

  return data;
}

// get my posts
export async function getMyPosts(query = "", cookies) {
  const res = await fetch(`${SERVER_URL}/api/posts/me?${query}`, {
    method: "GET",
    headers: getRequestHeaders(cookies),
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  // no posts found
  if (!data?.success && "posts" in data) return data;

  if (!data?.success) throw new Error(data?.message);

  return data;
}

// client side api calls
export async function getAllPosts() {
  const res = await fetch("/api/posts?getAll=true", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (data.success) return data;

  throw data;
}

export async function createPost(postData) {
  const { title, description } = postData;

  const res = await fetch(`/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      title,
      description,
    }),
  });

  const data = await res.json();

  return data;
}

export async function updatePost(postData) {
  const { id, title, description } = postData;

  const res = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      title,
      description,
    }),
  });

  const data = await res.json();

  return data;
}

export async function deletePost(id) {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  return data;
}
