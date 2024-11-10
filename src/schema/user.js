import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    validate: {
      validator: function (emailValue) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
      },
      message: "Invalid email format",
    },
  },

  password: {
    type: String,
    required: true,
    minLength: 5,
  },
});

userSchema.pre("save", function hashPassword(next) {
  // incoming user object
  const user = this; // object with plain password

  const SALT = bcrypt.genSaltSync(9);

  // hashPassword
  const hashedPassword = bcrypt.hashSync(user.password, SALT);

  // Replace plain password with hashed password
  user.password = hashedPassword;

  next();
});

const user = mongoose.model("User", userSchema);

export default user;
