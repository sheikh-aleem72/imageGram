import express from "express";
import postRouter from "./post.js";
import signupRouter from "./users.js";

const router = express.Router();

router.use("/posts", postRouter); // This line will route all url starting with /posts to the posts router

router.use("/users", signupRouter);

export default router;
