import asyncRouteHandlerWrapper from "@/utils/asyncRouteHandlerWrapper";
import { checkIfNotAuthenticated } from "@/middlewares/authentication";
import CustomError from "@/utils/CustomError";
import { forgotPasswordSchema } from "@/lib/validation/users";
import connectToDb from "@/config/database";
import UsersModel from "@/models/UsersModel";

import sendEmail from "@/utils/sendEmail";

export const POST = asyncRouteHandlerWrapper(async (req) => {
  const isNotAuthenticated = await checkIfNotAuthenticated(req);

  if (!isNotAuthenticated)
    throw new CustomError("You are already logged in!", 401);

  const { email } = await req.json();

  const isValid = forgotPasswordSchema.safeParse({ email });

  if (!isValid.success)
    throw new CustomError("Errors in received data!", 400, isValid.error);

  await connectToDb();

  const user = await UsersModel.findOne({ email: email });

  // don't let them know this email doesn't exist (can be a fraud request)
  if (user == null)
    return Response.json(
      {
        success: true,
        message: "Email sent successfully!",
      },
      { status: 200 },
    );

  /* check if user already has a reset password token
    and if there is, then make sure to only generate next token after 1 hour of delay
    to prevent DOS attack
    */

  if (user.resetPasswordToken != null) {
    const is1HrDelay =
      Date.now() - user.resetPasswordTokenExpiry > 45 * (60 * 1000);

    if (!is1HrDelay)
      throw new CustomError(
        "You have already requested, please retry after sometime!",
        400,
      );
  }

  const token = await user.getForgotPasswordToken();

  const subject = "Reset password";
  const text = `Click the link to reset your password ${process.env.SERVER_URL}/reset-password/${token}. If you have not requested it then please ignore.`;

  const isMailSent = await sendEmail(user.email, subject, text);

  if (!isMailSent) {
    // if mail is not sent then remove token from db
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;

    await user.save();

    throw new CustomError("Email not sent!", 500);
  }

  return Response.json(
    {
      success: true,
      message: "Email sent successfully!",
    },
    { status: 200 },
  );
});
