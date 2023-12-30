import connectToDb from "@/config/database";
import asyncRouteHandlerWrapper from "@/utils/asyncRouteHandlerWrapper";
import PostsModel from "@/models/PostsModel";
import getPaginationData from "@/lib/getPaginationData";
import getSearchData from "@/lib/getSearchData";
import { checkIfAuthenticated } from "@/middlewares/authentication";

export const GET = asyncRouteHandlerWrapper(async (req, { params }) => {
  const userId = await checkIfAuthenticated(req);

  // pagination
  const { recordsPerPage, offSet } = getPaginationData(req, 5);

  const searchData = getSearchData(req);

  await connectToDb();

  const [posts, totalPosts] = await PostsModel.paginatedPosts(
    searchData,
    offSet,
    recordsPerPage,
    userId,
  );

  if (posts.length === 0)
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
      pagination: {
        totalPosts,
        perPage: recordsPerPage,
      },
    },
    {
      status: 200,
    },
  );
});
