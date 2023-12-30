import connectToDb from "@/config/database";
import { checkIfAuthenticated } from "@/middlewares/authentication";
import checkIfAuthorized from "@/middlewares/authorization";
import UsersModel from "@/models/UsersModel";
import asyncRouteHandlerWrapper from "@/utils/asyncRouteHandlerWrapper";
import CustomError from "@/utils/CustomError";
import { updateSchema } from "@/lib/validation/users";
import uploadImage from "@/utils/uploadImage";
import deleteImage from "@/utils/deleteImage";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const GET = asyncRouteHandlerWrapper(async (req, { params }) => {
  // check if user is logged in

  const userId = await checkIfAuthenticated(req);

  await connectToDb();

  const paramsUserId = params.id;

  // only admin can access some other user's profile

  if (userId !== paramsUserId) {
    const isAuthorized = await checkIfAuthorized(userId);

    if (!isAuthorized) {
      // user is trying to access someone else's details
      throw new CustomError("Not Authorized!", 403);
    }
  }

  const user = await UsersModel.findById(paramsUserId);

  if (user != null) {
    return Response.json(
      {
        success: true,
        message: "Found user!",
        user: user.userInfo,
      },
      {
        status: 200,
      },
    );
  }

  throw new CustomError("User not found!", 404);
});

export const PUT = asyncRouteHandlerWrapper(async (req, { params }) => {
  // check if user is logged in

  const userId = await checkIfAuthenticated(req);

  const { name, email, profilePic } = await req.json();

  const isValid = updateSchema.safeParse({ name, email, profilePic });

  if (!isValid.success)
    throw new CustomError("Errors in received data!", 400, isValid.error);

  await connectToDb();

  const paramsUserId = params.id;

  // only admin can update some other user's profile

  if (userId !== paramsUserId) {
    const isAuthorized = await checkIfAuthorized(userId);

    if (!isAuthorized) {
      // user is trying to access someone else's details
      throw new CustomError("Not Authorized!", 403);
    }
  }

  // check if this new email doesn't already exist in db

  const isEmail = await UsersModel.findOne({
    _id: { $ne: new ObjectId(paramsUserId) },
    email: email,
  });

  if (isEmail != null) throw new CustomError("Email not available!", 401);

  const user = await UsersModel.findById(paramsUserId);

  if (user != null) {
    if (profilePic != null) {
      // delete previous profile image from cloudinary if available

      if (user.profileImage?.publicId != null) {
        const imageDeleteResult = await deleteImage(
          user.profileImage?.publicId,
        );

        if (imageDeleteResult?.result !== "ok") throw new CustomError();
      }

      // upload profile image
      const imageUploadResult = await uploadImage(profilePic);

      if (imageUploadResult?.public_id == null) throw new CustomError();

      user.profileImage = {
        publicId: imageUploadResult?.public_id,
        secureUrl: imageUploadResult?.secure_url,
      };
    }

    user.name = name;
    user.email = email;

    await user.save();

    return Response.json(
      {
        success: true,
        message: "User details updated!",
        user: user.userInfo,
      },
      {
        status: 200,
      },
    );
  }

  throw new CustomError("User not found!", 404);
});

export const DELETE = asyncRouteHandlerWrapper(async (req, { params }) => {
  // check if it's admin
  // only admin can delete user

  const userId = await checkIfAuthenticated(req);

  await connectToDb();

  const paramsUserId = params.id;

  const isAuthorized = await checkIfAuthorized(userId);

  if (!isAuthorized) {
    throw new CustomError("Not Authorized!", 403);
  }

  const deleteResult = await UsersModel.deleteOne({
    _id: new ObjectId(paramsUserId),
  });

  if (deleteResult.deletedCount === 1) {
    return Response.json(
      {
        success: true,
        message: "User deleted!",
      },
      {
        status: 200,
      },
    );
  }

  throw new CustomError("User not found!", 404);
});
