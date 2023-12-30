import Link from "next/link";
import { Suspense } from "react";

import PostsList from "@/components/postsList/PostsList";
import PostsListSkeleton from "@/components/postsList/PostsListSkeleton";
import SearchBar from "@/components/searchBar/SearchBar";

export const metadata = {
  title: "LEARN-NEXT - My Posts",
  description: "This is the browse user's posts page of LEARN-NEXT.",
};

export default async function MyPosts({ searchParams }) {
  const searchP = new URLSearchParams(searchParams);

  return (
    <section className="min-h-screen p-4">
      <div className="mx-auto grid w-11/12 max-w-5xl grid-cols-1 items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <h1 className="text-3xl sm:text-5xl md:text-6xl">
          <Link href="/posts/me" className="hover:opacity-75">
            MY POSTS
          </Link>
        </h1>

        <SearchBar />

        <Link
          href={`/posts/new?${searchP.toString()}`}
          className="justify-self-start rounded-md bg-sky-400 p-2 text-slate-100 hover:bg-blue-500 sm:text-lg lg:justify-self-end"
        >
          POST NEW
        </Link>

        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList searchP={searchP} allPosts={false} />
        </Suspense>
      </div>
    </section>
  );
}
