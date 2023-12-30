import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  profileImage: {
    publicId: String,
    secureUrl: String,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "password must be at least 8 characters."],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm password is required"],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: (props) => "password and confirmPassword must be same.",
    },
    select: false,
  },

  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,

  resetPasswordTokenExpiry: Date,

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
});

usersSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

usersSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

usersSchema.methods.getForgotPasswordToken = async function () {
  const token = crypto.randomBytes(64).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const tokenExpiry = Date.now() + 15 * 60 * 1000;

  this.resetPasswordToken = hashedToken;
  this.resetPasswordTokenExpiry = tokenExpiry;

  await this.save();

  return token;
};

usersSchema.virtual("userInfo").get(function () {
  if (this.role === "admin")
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      profilePic: this.profileImage?.secureUrl,
      role: this.role,
    };

  return {
    id: this._id,
    name: this.name,
    email: this.email,
    profilePic: this.profileImage?.secureUrl,
  };
});

const UsersModel =
  mongoose?.models?.Users || mongoose.model("Users", usersSchema);

export default UsersModel;
