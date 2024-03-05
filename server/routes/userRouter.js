import express from "express";
import {
  deleteUser,
  followUser,
  getUserDetail,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/bloggers", getUsers);
router.get("/:id", verifyToken, getUserDetail);
router.post("/follow/:id", verifyToken, followUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
