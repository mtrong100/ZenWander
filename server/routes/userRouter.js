import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserDetail,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/all", verifyToken, getAllUsers);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUserDetail);

export default router;
