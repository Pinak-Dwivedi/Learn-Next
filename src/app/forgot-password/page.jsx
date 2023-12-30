import ForgotPasswordForm from "@/components/forgotPassword/ForgotPassword";

export const metadata = {
  title: "LEARN-NEXT - Forgot-Password ",
  description: "This is the forgot-password page of LEARN-NEXT.",
};

export default function ForgotPassword() {
  return (
    <section className="min-h-screen py-8">
      <div className="mx-auto flex w-11/12 max-w-5xl flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl">Find your account</h1>

        <p className="text-slate-600 dark:text-slate-400 md:text-lg">
          Enter your email to get the link to reset your password.
        </p>

        <ForgotPasswordForm />
      </div>
    </section>
  );
}
