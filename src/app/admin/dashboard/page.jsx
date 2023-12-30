import UserPostInfo from "@/components/userPostInfo/UserPostInfo";

export const metadata = {
  title: "LEARN-NEXT - Admin - Dashboard",
  description: "This is the admin dashboard page of LEARN-NEXT.",
};

export default function Dashboard() {
  return (
    <section className="min-h-screen p-4">
      <div className="mx-auto flex w-11/12 max-w-5xl flex-col gap-8">
        <h1 className="break-words text-xl sm:text-2xl md:text-3xl">
          Dashboard
        </h1>

        <UserPostInfo />
      </div>
    </section>
  );
}
