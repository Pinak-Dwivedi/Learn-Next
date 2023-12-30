import { jwtVerify } from "jose";
import CustomError from "@/utils/CustomError";

export async function checkIfAuthenticated(req) {
  try {
    // call this method where authentication is required
    let token = req.cookies.get("token")?.value;

    // for the authorization header set in middleware
    if (token == null) token = req.headers.get("Authorization")?.split(" ")[1];

    if (token != null) {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET),
      );

      const userId = payload?._id;

      //user is authenticated
      return userId;
    }

    //user is not authenticated
    // throw new CustomError("Not Authenticated!", 401);

    throw new CustomError("You need to login first!", 401);
  } catch (error) {
    throw new CustomError("You need to login first!", 401);
  }
}

export async function checkIfNotAuthenticated(req) {
  try {
    // call this method where being not authenticated is required e.g. login, signup

    let token = req.cookies.get("token")?.value;

    // for the authorization header set in middleware
    if (token == null) token = req.headers.get("Authorization")?.split(" ")[1];

    if (token != null) {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET),
      );
      return false; //user is already authenticated
    }

    return true; //yes user is not authenticated
  } catch (error) {
    return true; //yes user is not authenticated
  }
}
