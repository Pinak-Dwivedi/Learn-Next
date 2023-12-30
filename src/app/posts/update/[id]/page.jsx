import UpdatePostForm from "@/components/updatePost/UpdatePost";
import { notFound } from "next/navigation";
import { getPost } from "@/utils/apiCalls/posts";
import { cookies } from "next/headers";

export async function generateMetadata({ params }) {
  const data = await getPost(params.id, cookies());

  if (!data.success) notFound();

  const post = data.post;

  return {
    title: `LEARN-NEXT - Update Post - ${post.title}`,
    description: `This is the update post page of LEARN-NEXT, which contains the post with the following description: ${post.description
      .split(" ")
      .slice(0, 10)
      .join(" ")
      .concat("...")}`,
  };
}

export default async function UpdatePost({ params: { id } }) {
  const data = await getPost(id, cookies());

  if (!data.success) notFound();

  if (data?.success) {
    const { title, description } = data?.post;

    return <UpdatePostForm id={id} title={title} description={description} />;
  }
}
