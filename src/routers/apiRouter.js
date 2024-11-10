import express from "express";
import v1Router from "./v1/v1Router.js";

const router = express.Router();

router.use("/v1", v1Router); // This line will route all url starting with /v1 to the v1 router

export default router;
