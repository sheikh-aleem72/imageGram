import {
  createUserService,
  signinUserService,
} from "../services/userService.js";

export async function getUser(req, res) {
  return res.json({
    success: false,
    message: "unimplemented user",
  });
}

export const createUserController = async (req, res) => {
  try {
    console.log("req body", req.body);
    const { username, email, password, role } = req.body;

    // call service crate a new user
    const newUser = await createUserService(username, email, password, role);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("log from user controller", error);

    // handle dupliacte key error
    if (error.status === 400) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    // handle other errors
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      errors: error.errors,
    });
  }
};

export const signInUserController = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const response = await signinUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "User signed in successfully",
      data: response,
    });
  } catch (error) {
    console.log("log from user controller", error);

    // handle dupliacte key error
    if (error.status === 400) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    // handle other errors
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      errors: error.errors,
    });
  }
};
