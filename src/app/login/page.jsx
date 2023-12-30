import SignInUp from "@/components/signInUp/SignInUp";

export const metadata = {
  title: "LEARN-NEXT - Sing-In/Sign-Up",
  description: "This is the sign-in/sign-up page of LEARN-NEXT.",
};

export default function LoginAndSignUp() {
  return (
    <section className="min-h-screen sm:p-8">
      <div className="mx-auto flex w-11/12 max-w-lg flex-col gap-4 overflow-hidden rounded-md ">
        <SignInUp />
      </div>
    </section>
  );
}
