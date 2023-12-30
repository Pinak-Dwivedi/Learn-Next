import CreatePostForm from "@/components/createPost/CreatePost";

export const metadata = {
  title: "LEARN-NEXT - Create Post",
  description: "This is the create new post page of LEARN-NEXT.",
};

export default function CreatePost() {
  return (
    <section className="min-h-screen p-4">
      <h1 className="text-2xl sm:text-4xl">CREATE POST</h1>

      <CreatePostForm />
    </section>
  );
}
