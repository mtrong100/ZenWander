import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const blogSchema = new mongoose.Schema(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    views: { type: Number, default: 0 },
    likes: { type: Array },
  },
  {
    timestamps: true,
  }
);

blogSchema.plugin(mongoosePaginate);
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
