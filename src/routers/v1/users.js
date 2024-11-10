import express from "express";
import {
  createUserController,
  signInUserController,
} from "../../controller/userController.js";
import multer from "multer";
import { validate } from "../../validators/zodValidator.js";
import { zodSigninSchema } from "../../validators/ZodSigninValidator.js";

const upload = multer();
const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *       summary: Signup a new user
 *       description: Signup a new user
 *       responses:
 *           "200":
 *              description: "User created successfully"
 *           "400":
 *              description: "Username or Email is already registered"
 *           "500":
 *             description: "Something went wrong"
 *       requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    username:
 *                      type: string
 *                      description: username of the user
 *                      example: Sam shine
 *       parameters:
 *        - in: header
 *          name: username
 *          required: true
 *          unique: true
 *          description: Unique username for the user.
 *          schema:
 *            type: String
 *        - in: header
 *          name: email
 *          required: true
 *          unique: true
 *          description: Email of the user.
 *          schema:
 *            type: String
 *        - in: header
 *          name: password
 *          required: true
 *          unique: true
 *          description: Password to retrieve account.
 *          schema:
 *            type: String
 */
router.post("/signup", upload.none(), createUserController); // When we send data using form-data (multipart) from postman we need to use upload.none() middleware to parse the form-data because form-data(multipart) is used to send file and text and which can only be parsed using multer.

/**
 * @swagger
 * /users/signin:
 *  post:
 *      summary: Signin a new user
 *      description: Signin a new user
 *
 */
router.post("/signin", upload.none(), signInUserController);

export default router;
