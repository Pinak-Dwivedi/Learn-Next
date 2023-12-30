import connectToDb from "@/config/database";
import {
  checkIfAuthenticated,
  checkIfNotAuthenticated,
} from "@/middlewares/authentication";
import checkIfAuthorized from "@/middlewares/authorization";
import UsersModel from "@/models/UsersModel";
import CustomError from "@/utils/CustomError";
import asyncRouteHandlerWrapper from "@/utils/asyncRouteHandlerWrapper";
import generateCookieOptions from "@/utils/generateCookieOptions";
import generateJWTToken from "@/utils/generateJWTToken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validation/users";

export const GET = asyncRouteHandlerWrapper(async (req, { params }) => {
  // only admin can view all users

  const userId = await checkIfAuthenticated(req);

  await connectToDb();

  const isAuthorized = await checkIfAuthorized(userId);

  if (!isAuthorized) {
    throw new CustomError("Not Authorized!", 403);
  }

  // let url = new URL(req.url);
  // let searchParams = Object.fromEntries(url.searchParams);

  // console.log("req.nextUrl", req.nextUrl);
  // console.log("searchParams", searchParams);

  let users = await UsersModel.find(
    {},
    {
      id: "$_id",
      name: 1,
      email: 1,
      profilePic: "$profileImage.secureUrl",
      create_date: "$createdAt",
    },
  );

  if (users.length === 0)
    return Response.json(
      {
        success: false,
        message: "No user was found!",
        users: [],
      },
      { status: 200 },
    );

  return Response.json(
    {
      success: true,
      message: "Found Users!",
      users,
    },
    { status: 200 },
  );
});

export const POST = asyncRouteHandlerWrapper(async (req, { params }) => {
  //check if user is not already authenticated

  const isNotAuthenticated = await checkIfNotAuthenticated(req);

  if (!isNotAuthenticated) {
    throw new CustomError("You are already logged in!", 401);
  }

  const { name, email, password, confirmPassword } = await req.json();

  const isValid = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!isValid.success)
    throw new CustomError("Errors in received data!", 400, isValid.error);

  await connectToDb();

  const user = await UsersModel.create({
    name,
    email,
    password,
    confirmPassword,
  });

  if (user != null) {
    let hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.confirmPassword = hashedPassword;

    await user.save();

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
        message: "User registered successfully!",
        user: user.userInfo,
      },
      {
        status: 201,
        headers: response.headers,
      },
    );
  }

  throw new CustomError();
});
