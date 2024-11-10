import cloudinary from "../config/cloudinaryConfig.js";
import post from "../schema/post.js";
import {
  createPostService,
  deletePostService,
  getAllPostsService,
  getPostService,
  updatePostService,
} from "../services/postService.js";

// Controller for creating new post
export async function createPost(req, res) {
  try {
    console.log(req.user);
    const user = req.user;
    const post = await createPostService(
      req.file.path,
      req.body.caption,
      user._id
    );

    return res.status(201).json({ message: "Success", data: post });
  } catch (error) {}
}

// Controller for fetching all the posts stored in the database.
export async function getAllPostsController(req, res) {
  try {
    console.log("offset and limit", req.query);
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 5;
    const allPosts = await getAllPostsService(offset, limit);

    return res.json({
      message: "All posts fetched successfully",
      data: allPosts,
    });
  } catch (error) {
    console.log("Error at get all post controller", error);
    return res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
}

// Controller to connect a perticular post
export async function getPost(req, res) {
  try {
    const post = await getPostService(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
    if (error.status === 403) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// Controller to delete a perticular post
export async function deletePost(req, res) {
  try {
    const post = await deletePostService(req.params.id, req.user);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "post deleted successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function updatePost(req, res) {
  try {
    const updateObj = req.body;

    if (req.file) {
      // Upload image to Cloudinary
      const imageUploadResponse = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "Image_gram",
        }
      );

      // Get the secure URL from Cloudinary response
      updateObj.image = imageUploadResponse.secure_url;
    }
    const response = await updatePostService(req.params.id, updateObj);
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some internal error",
      errors: error.errors,
    });
  }
}
