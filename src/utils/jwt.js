import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/envConfig.js";

export const generateJwtToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY);
};

export const verifyJWT = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};
