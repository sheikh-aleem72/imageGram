import express from "express";
import { upload } from "../../config/multerConfig.js";
import {
  createPost,
  deletePost,
  getAllPostsController,
  getPost,
  updatePost,
} from "../../controller/postController.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";
import { validate } from "../../validators/zodValidator.js";
import { isAdmin, isAuthenticate } from "../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /posts:
 *    post:
 *      summary: Create a new post
 *      description: Create a new post
 *
 */
router.post(
  "/",
  isAuthenticate,
  upload.single("image"),
  validate(zodPostSchema),
  createPost
);

router.get("/", getAllPostsController);

router.get("/:id", getPost);

router.delete("/:id", isAuthenticate, deletePost);

router.put("/:id", isAuthenticate, isAdmin, upload.single("image"), updatePost);

export default router;
