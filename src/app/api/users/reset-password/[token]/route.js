import asyncRouteHandlerWrapper from "@/utils/asyncRouteHandlerWrapper";
import { checkIfNotAuthenticated } from "@/middlewares/authentication";
import CustomError from "@/utils/CustomError";
import { resetPasswordSchema } from "@/lib/validation/users";
import connectToDb from "@/config/database";
import UsersModel from "@/models/UsersModel";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const PUT = asyncRouteHandlerWrapper(async (req, { params }) => {
  const isNotAuthenticated = await checkIfNotAuthenticated(req);

  if (!isNotAuthenticated) {
    throw new CustomError("You are already logged in!", 401);
  }

  const { password, confirmPassword } = await req.json();

  const isValid = resetPasswordSchema.safeParse({ password, confirmPassword });

  if (!isValid.success)
    throw new CustomError("Errors in received data!", 400, isValid.error);

  await connectToDb();

  const token = params.token;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await UsersModel.findOne({ resetPasswordToken: hashedToken });

  // wrong token or expired token
  if (user == null || Date.now() > user.resetPasswordTokenExpiry)
    throw new CustomError("Invalid credentials!", 400);

  // update password

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.confirmPassword = hashedPassword;

  // remove token from database
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiry = undefined;

  await user.save();

  return Response.json(
    {
      success: true,
      message: "Password updated successfully!",
    },
    { status: 200 },
  );
});
