import { checkIfAuthenticated } from "@/middlewares/authentication";
import asyncRouteHandlerWrapper from "@/utils/asyncRouteHandlerWrapper";
import UsersModel from "@/models/UsersModel";
import connectToDb from "@/config/database";

export const GET = asyncRouteHandlerWrapper(async (req, { params }) => {
  // check if authenticated

  const userId = await checkIfAuthenticated(req);

  await connectToDb();

  const user = await UsersModel.findById(userId, {
    _id: 1,
    name: 1,
    email: 1,
    profileImage: 1,
    role: 1,
  });

  if (user != null)
    return Response.json(
      {
        success: true,
        message: "Authenticated!",
        user: user.userInfo,
      },
      {
        status: 200,
      },
    );

  throw new CustomError("User not found!", 404);
});
