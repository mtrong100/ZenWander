import express from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import blogRouter from "./blogRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/blog", blogRouter);

export default router;
