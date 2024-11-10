import User from "../schema/user.js";

export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });

    return user;
  } catch (error) {
    console.log("error from repository:", error);
    throw error;
  }
};

export const createUser = async (username, email, password, role) => {
  try {
    const user = await User.create({ username, email, password, role });
    return user;
  } catch (error) {
    console.log("repository error", error);
    throw error;
  }
};
