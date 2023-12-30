import connectToDb from "@/config/database";
import UsersModel from "@/models/UsersModel";
import asyncRouteHandlerWrapper from "@/utils/asyncRouteHandlerWrapper";
import CustomError from "@/utils/CustomError";
import generateJWTToken from "@/utils/generateJWTToken";
import generateCookieOptions from "@/utils/generateCookieOptions";
import { NextResponse } from "next/server";
import { checkIfNotAuthenticated } from "@/middlewares/authentication";
import { loginSchema } from "@/lib/validation/users";

export const POST = asyncRouteHandlerWrapper(async (req, { params }) => {
  //check if user is not already authenticated

  const isNotAuthenticated = await checkIfNotAuthenticated(req);

  if (!isNotAuthenticated) {
    throw new CustomError("You are already logged in!", 401);
  }

  const { email, password } = await req.json();

  const isValid = loginSchema.safeParse({ email, password });

  if (!isValid.success) {
    throw new CustomError("Errors in received data!", 400, isValid.error);
  }

  await connectToDb();

  const user = await UsersModel.findOne(
    { email: email },
    { _id: 1, name: 1, email: 1, password: 1, role: 1, profileImage: 1 },
  );

  if (user != null) {
    let doesPasswordMatch = await user.comparePassword(password);

    if (doesPasswordMatch) {
      // login, create token

      // const payload = { _id: user._id.valueOf() };

      const token = await generateJWTToken({ _id: user._id });
      const cookieOptions = generateCookieOptions();

      const response = new NextResponse();

      response.cookies.set({
        name: "token",
        value: token,
        ...cookieOptions,
      });

      return Response.json(
        {
          success: true,
          message: "Log in successful!",
          user: user.userInfo,
        },
        {
          status: 200,
          headers: response.headers,
        },
      );
    }
  }

  throw new CustomError("Incorrect email or password!", 401);
});
