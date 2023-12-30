import { cookies } from "next/headers";
import { getPosts, getMyPosts } from "@/utils/apiCalls/posts";
import Pagination from "@/components/pagination/Pagination";
import Post from "@/components/post/Post";

export default async function PostsList({ searchP, allPosts }) {
  const data = allPosts
    ? await getPosts(searchP.toString(), cookies())
    : await getMyPosts(searchP.toString(), cookies());

  const posts = data?.posts;
  const paginationData = data?.pagination;

  function showPosts() {
    if (posts != null && posts?.length > 0)
      return posts?.map((post, i) => <Post key={i} postData={post} />);

    return (
      <span className="col-span-full text-lg sm:text-xl">
        😢 No post was found!
      </span>
    );
  }

  return (
    <>
      <section className="mx-auto mt-8 grid w-11/12 max-w-4xl grid-cols-fluid gap-6 sm:col-span-2 lg:col-span-3">
        {showPosts()}
      </section>

      <Pagination paginationData={paginationData} />
    </>
  );
}
