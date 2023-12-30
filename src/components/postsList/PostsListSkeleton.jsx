import PostSkeleton from "../post/PostSkeleton";

export default function PostsListSkeleton() {
  const postsSkeleton = Array(5).fill(1);

  return (
    <section className="mx-auto mt-8 grid w-11/12 max-w-4xl animate-pulse grid-cols-fluid gap-6 sm:col-span-2 lg:col-span-3">
      {postsSkeleton?.map((post, i) => (
        <PostSkeleton key={i} />
      ))}
    </section>
  );
}
