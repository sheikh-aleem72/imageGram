import {
  createPost,
  getAllPost,
  getAllDocument,
  findPostById,
  deletePost,
  updatePost,
} from "../repositories/postRepository.js";
import cloudinary from "../config/cloudinaryConfig.js";

// Function to create post that will interact with the repository layer
export const createPostService = async (image, caption, user) => {
  // 1. Take the image of the post and upload on aws or cloudinary
  // 2. Get the url of the image from the aws response
  const imageUrl = await cloudinary.uploader.upload(image, {
    folder: "Image_gram",
  });

  // 3. Create a post with the caption and the image url in the db using repository
  const post = await createPost(caption, imageUrl.secure_url, user);

  // 4. Return the post object
  return post;
};

// function to count all posts
export const getAllPostsService = async (offset, limit) => {
  const allPosts = await getAllPost(offset, limit);
  const totalPosts = await getAllDocument();
  const totalPages = Math.ceil(totalPosts / limit);

  console.log("total posts : ", totalPosts);

  return {
    posts: allPosts,
    totalPosts: totalPosts,
    totalPages: totalPages,
  };
};

// function to get a perticular post
export const getPostService = async (id) => {
  const post = await findPostById(id);

  return post;
};

export const deletePostService = async (id, user) => {
  try {
    const postDetail = await findPostById(id);

    console.log("post details:", postDetail);
    if (postDetail.user.username !== user.username) {
      throw {
        status: 400,
        message: "You are not authorized",
      };
    }

    const post = await deletePost(id);

    return post;
  } catch (error) {
    throw error;
  }
};

export const updatePostService = async (id, updateObj) => {
  const post = await updatePost(id, updateObj);

  return post;
};
