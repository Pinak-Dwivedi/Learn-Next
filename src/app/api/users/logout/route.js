import asyncRouteHandlerWrapper from "@/utils/asyncRouteHandlerWrapper";
import generateJWTToken from "@/utils/generateJWTToken";
import generateCookieOptions from "@/utils/generateCookieOptions";
import { NextResponse } from "next/server";
import { checkIfAuthenticated } from "@/middlewares/authentication";

export const POST = asyncRouteHandlerWrapper(async (req, { params }) => {
  // check if user is logged in

  await checkIfAuthenticated(req);

  const token = await generateJWTToken({ logout: true }, true);
  const cookieOptions = generateCookieOptions(true);

  const response = new NextResponse();

  response.cookies.set({
    name: "token",
    value: token,
    ...cookieOptions,
  });

  return Response.json(
    {
      success: true,
      message: "Log out successful!",
    },
    {
      status: 200,
      headers: response.headers,
    },
  );
});
