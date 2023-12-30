import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minLength: [5, "title must be at least 5 characters long"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
    minLength: [30, "description must be at least 30 characters long"],
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
    select: false,
  },

  updatedAt: {
    type: Date,
    default: () => Date.now(),
    select: false,
  },

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
    required: [true, "user is required"],
  },
});

postsSchema.statics.paginatedPosts = async function (
  search = {},
  offSet = 0,
  recordsPerPage = 3,
  userId = null,
) {
  if (search == null) {
    search = {};
  } else {
    search = {
      $or: [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ],
    };
  }

  if (userId != null) {
    search = { $and: [{ user: new ObjectId(userId) }, { ...search }] };
  }

  const result = await this.aggregate([
    {
      $facet: {
        posts: [
          { $match: search },
          { $skip: offSet },
          { $limit: recordsPerPage },
          { $project: { __v: 0 } },
        ],

        postsCount: [{ $match: search }, { $count: "total" }],
      },
    },
  ]);

  return [result[0]?.posts, result[0]?.postsCount[0]?.total];
};

postsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const PostsModel =
  mongoose.models.Posts || mongoose.model("Posts", postsSchema);

export default PostsModel;
