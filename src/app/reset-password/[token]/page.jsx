import ResetPasswordForm from "@/components/resetPassword/ResetPassword";

export const metadata = {
  title: "LEARN-NEXT - Reset-Password",
  description: "This is the reset-password page of LEARN-NEXT.",
};

export default function ResetPassword({ params: { token } }) {
  return (
    <section className="min-h-screen py-8">
      <div className="mx-auto flex w-11/12 max-w-5xl flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl">Reset Password</h1>

        <ResetPasswordForm token={token} />
      </div>
    </section>
  );
}
