import UpdateUser from "@/components/updateUser/UpdateUser";

export const metadata = {
  title: "LEARN-NEXT - Admin - Update User",
  description: "This is the admin update-user page of LEARN-NEXT.",
};

export default function User({ params: { id } }) {
  return (
    <section className="min-h-screen p-4">
      <UpdateUser />
    </section>
  );
}
