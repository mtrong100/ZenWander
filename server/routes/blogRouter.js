import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogDetail,
  getBlogsFromUser,
  updateBlog,
} from "../controllers/blogController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/all", getAllBlogs);
router.get("/:id", getBlogDetail);
router.get("/user/:authorId", verifyToken, getBlogsFromUser);

/* CRUD */
router.post("/create", verifyToken, createBlog);
router.put("/update/:id", verifyToken, updateBlog);
router.delete("/delete/:id", verifyToken, deleteBlog);

export default router;
