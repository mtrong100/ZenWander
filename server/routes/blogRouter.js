import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogDetail,
  getBlogsFromUser,
  getCommentsFromBlog,
  likeBlog,
  updateBlog,
  viewBlog,
} from "../controllers/blogController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/all", getAllBlogs);
router.get("/:id", getBlogDetail);
router.get("/user/:authorId", verifyToken, getBlogsFromUser);
router.get("/comments/:blogId", getCommentsFromBlog);

router.post("/view/:id", viewBlog);
router.post("/like/:blogId/:userId", verifyToken, likeBlog);

/* CRUD */
router.post("/create", verifyToken, createBlog);
router.put("/update/:id", verifyToken, updateBlog);
router.delete("/delete/:id", verifyToken, deleteBlog);

export default router;
