import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    provider: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordOtp: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    favorites: { type: Array },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", userSchema);
export default User;
