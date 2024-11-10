import mongoose from "mongoose";
import { DB_URL } from "./envConfig.js";

export default async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connect to DB");
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
}
