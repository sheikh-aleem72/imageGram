import post from "../schema/post.js";

export const createPost = async (caption, image, user) => {
  try {
    const newPost = post.create({ caption, image, user });
    // Another way for creating a post is,
    // const newPost = new Post({caption,image,user});
    // await newPost.save()
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

// Query to fetch all posts from database.
export const getAllPost = async (offset, limit) => {
  try {
    const allPost = await post
      .find()
      .sort({ createAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("user", "username email _id"); // This method fetch all the details of referenced key. E.g. user
    return allPost;
  } catch (error) {
    console.log(error);
  }
};

// Query to count all documents or posts from database.
export const getAllDocument = async () => {
  try {
    const allDocument = await post.countDocuments();
    return allDocument;
  } catch (error) {
    console.log(error);
  }
};

export const findPostById = async (id) => {
  try {
    const postData = post
      .findOne({ _id: id })
      .populate("user", "username email _id");
    return postData;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    const postDelete = post.findByIdAndDelete({ _id: id });
    return postDelete;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (id, updateObj) => {
  try {
    const updatedPost = await post.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};
