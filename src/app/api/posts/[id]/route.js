import connectToDb from "@/config/database";
import PostsModel from "@/models/PostsModel";
import asyncRouteHandlerWrapper from "@/utils/asyncRouteHandlerWrapper";
import CustomError from "@/utils/CustomError";
import { checkIfAuthenticated } from "@/middlewares/authentication";
import checkIfAuthorized from "@/middlewares/authorization";
import { postSchema } from "@/lib/validation/posts";

export const GET = asyncRouteHandlerWrapper(async (req, { params }) => {
  const userId = await checkIfAuthenticated(req);

  await connectToDb();

  const postId = params.id;

  const post = await PostsModel.findById(postId, { __v: 0 });

  if (post != null)
    return Response.json(
      {
        success: true,
        message: "Found post!",
        post,
      },
      {
        status: 200,
      },
    );

  throw new CustomError("Post not found!", 404);
});

export const PUT = asyncRouteHandlerWrapper(async (req, { params }) => {
  const userId = await checkIfAuthenticated(req);

  const { title, description } = await req.json();

  const isValid = postSchema.safeParse({ title, description });

  if (!isValid.success)
    throw new CustomError("Errors in received data!", 400, isValid.error);

  // only user can update his own post or admin can update it

  const postId = params.id;

  await connectToDb();

  const post = await PostsModel.findById(postId).populate("user");

  if (post == null) throw new CustomError("Post not found!", 404);

  if (userId !== post?.user?._id?.valueOf()) {
    const isAuthorized = await checkIfAuthorized(userId);

    if (!isAuthorized) {
      throw new CustomError("Not Authorized!", 403);
    }
  }

  post.title = title;
  post.description = description;

  await post.save();

  return Response.json(
    {
      success: true,
      message: "Post updated!",
      post,
    },
    {
      status: 200,
    },
  );
});

export const DELETE = asyncRouteHandlerWrapper(async (req, { params }) => {
  const userId = await checkIfAuthenticated(req);

  await connectToDb();

  // user can only delete their own post or admin can delete it

  const postId = params.id;

  const post = await PostsModel.findById(postId).populate("user");

  if (post == null) throw new CustomError("Post not found!", 404);

  if (userId !== post?.user?._id?.valueOf()) {
    const isAuthorized = await checkIfAuthorized(userId);

    if (!isAuthorized) {
      throw new CustomError("Not Authorized!", 403);
    }
  }

  const deleteResult = await PostsModel.deleteOne({ _id: postId });

  if (deleteResult.deletedCount === 1)
    return Response.json(
      {
        success: true,
        message: "Post deleted!",
      },
      {
        status: 200,
      },
    );

  // if for some reason post couldn't be deleted
  throw new CustomError();
});
