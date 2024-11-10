import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/jwt.js";

export const createUserService = async (username, email, password, role) => {
  try {
    const newUser = await createUser(username, email, password, role);

    return newUser;
  } catch (error) {
    console.log("service error", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]; // Get the duplicate field name
      throw {
        status: 400,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is already taken.`,
      };
    }

    throw error;
  }
};

export const signinUserService = async (userDetails) => {
  try {
    // find user is registered or not
    const user = await findUserByEmail(userDetails.email);

    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      };
    }

    // Check for password
    const isValidPassword = bcrypt.compareSync(
      userDetails.password,
      user.password
    );

    if (!isValidPassword) {
      throw {
        status: 401,
        message: "Invalid password",
      };
    }

    // Generate JWT token
    const token = generateJwtToken({
      email: user.email,
      _id: user._id,
      username: user.username,
      role: user.role || "user",
    });

    return token;
  } catch (error) {
    throw error;
  }
};

export const checkIfUserExists = async (email) => {
  try {
    const response = await findUserByEmail(email);
    return response;
  } catch (error) {
    throw error;
  }
};
