import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/all", getAllComments);

/* CRUD */
router.post("/create", verifyToken, createComment);
router.put("/update/:id", verifyToken, updateComment);
router.delete("/delete/:id", verifyToken, deleteComment);

export default router;
