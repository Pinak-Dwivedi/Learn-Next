import { getUserInfo } from "@/utils/apiCalls/users";
import UserProfile from "@/components/userProfile/UserProfile";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "LEARN-NEXT - My Profile",
  description: "This is the user profile page of LEARN-NEXT.",
};

export default async function MyProfile() {
  const data = await getUserInfo(cookies());

  if (!data.success) notFound();

  return <UserProfile userInfo={data?.user} />;
}
