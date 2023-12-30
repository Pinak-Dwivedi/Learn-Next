import UsersModel from "@/models/UsersModel";

export default async function checkIfAuthorized(userId) {
  const user = await UsersModel.findById(userId);

  if (user.role === "admin") return true;

  return false;
}
