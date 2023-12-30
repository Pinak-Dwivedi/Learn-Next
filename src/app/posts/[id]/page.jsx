import Image from "next/image";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getPost } from "@/utils/apiCalls/posts";

export async function generateMetadata({ params }) {
  const data = await getPost(params.id, cookies());

  if (!data.success) notFound();

  const post = data.post;

  return {
    title: `LEARN-NEXT - Post - ${post.title}`,
    description: `This is the post page of LEARN-NEXT, which contains the post with the following description: ${post.description
      .split(" ")
      .slice(0, 10)
      .join(" ")
      .concat("...")}`,
  };
}

export default async function Post({ params }) {
  const data = await getPost(params.id, cookies());

  if (!data.success) notFound();

  const post = data.post;

  return (
    <section className="p4 min-h-screen">
      <div className="mx-auto flex min-h-screen w-11/12 max-w-6xl flex-col gap-8">
        <div className="relative aspect-video w-3/4 self-center overflow-hidden rounded-md">
          <Image
            src={`https://source.unsplash.com/random/?${post?.title}`}
            fill
            sizes="100vw"
            priority
            alt="post"
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          {post?.title}
        </h1>

        <div className="text-lg">{post?.description}</div>
      </div>
    </section>
  );
}
