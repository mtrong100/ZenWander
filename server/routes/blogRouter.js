import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogDetail,
  getBlogsByCategory,
  getBlogsFromUser,
  updateBlog,
} from "../controllers/blogController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/all", verifyToken, getAllBlogs);
router.post("/create", verifyToken, createBlog);
router.put("/update/:id", verifyToken, updateBlog);
router.delete("/delete/:id", verifyToken, deleteBlog);
router.get("/:id", verifyToken, getBlogDetail);
router.get("/user/:authorId", verifyToken, getBlogsFromUser);
router.get("/category/:category", verifyToken, getBlogsByCategory);

export default router;
