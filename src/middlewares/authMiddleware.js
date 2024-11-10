import { checkIfUserExists } from "../services/userService.js";
import { verifyJWT } from "../utils/jwt.js";

export const isAuthenticate = async (req, res, next) => {
  // check if jwt token is passed in header
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required",
    });
  }

  // verify token
  try {
    const response = verifyJWT(token);

    // Check if the user still exists or not
    const doesUserExists = await checkIfUserExists(response.email);

    if (!doesUserExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // add user property to the request which will consists email and username of user
    req.user = response;

    // call the next middleware

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const isAdmin = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
};
