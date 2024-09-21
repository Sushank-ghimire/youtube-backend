import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Username is already used"],
      lowercase: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email must be required"],
      unique: [true, "Email already used"],
      lowercase: true,
      trim: true,
    },
    id: {
      type: String,
    },
    avatar: {
      // Cloudinary URL
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      required: [true, "Password must be required"],
      type: String,
      unique: [true, "Commenly used password"],
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPRY
    }
  );
};

export const User = model("User", userSchema);
