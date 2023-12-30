import connectToDb from "@/config/database";
import getPaginationData from "@/lib/getPaginationData";
import getSearchData from "@/lib/getSearchData";
import { checkIfAuthenticated } from "@/middlewares/authentication";
import PostsModel from "@/models/PostsModel";
import CustomError from "@/utils/CustomError";
import asyncRouteHandlerWrapper from "@/utils/asyncRouteHandlerWrapper";
import { postSchema } from "@/lib/validation/posts";
import checkIfAuthorized from "@/middlewares/authorization";
// import mongoose from "mongoose";
// const ObjectId = mongoose.Types.ObjectId;

export const GET = asyncRouteHandlerWrapper(async (req, { params }) => {
  const userId = await checkIfAuthenticated(req);

  // pagination
  const { recordsPerPage, offSet } = getPaginationData(req, 5);

  // search
  const searchData = getSearchData(req);

  await connectToDb();

  // check if it's admin and if they want all the posts for dashboard postsCount

  let posts, totalPosts;
  let isGetAll = false;
  let pagination;

  const isAuthorized = await checkIfAuthorized(userId);

  if (isAuthorized) {
    const searchParams = req.nextUrl.searchParams;
    isGetAll = searchParams.get("getAll")?.trim() === "true";
  }

  if (isGetAll) {
    posts = await PostsModel.find();
  } else {
    [posts, totalPosts] = await PostsModel.paginatedPosts(
      searchData,
      offSet,
      recordsPerPage,
    );

    pagination = {
      totalPosts,
      perPage: recordsPerPage,
    };
  }

  if (posts == null || posts?.length === 0)
    return Response.json(
      {
        success: false,
        message: "No post was found!",
        posts: [],
      },
      { status: 200 },
    );

  return Response.json(
    {
      success: true,
      message: "Found posts!",
      posts,
      pagination,
    },
    {
      status: 200,
    },
  );
});

export const POST = asyncRouteHandlerWrapper(async (req, { params }) => {
  const userId = await checkIfAuthenticated(req);

  const { title, description } = await req.json();

  const isValid = postSchema.safeParse({ title, description });

  if (!isValid.success)
    throw new CustomError("Errors in received data!", 400, isValid.error);

  await connectToDb();

  const post = await PostsModel.create({
    title,
    description,
    user: userId,
  });

  if (post != null)
    return Response.json(
      {
        success: true,
        message: "Post created successfully!",
      },
      { status: 201 },
    );

  throw new CustomError();
});
