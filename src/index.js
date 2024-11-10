import express from "express";
import connectDB from "./config/dbConfig.js";
import apiRouter from "./routers/apiRouter.js";
import { isAuthenticate } from "./middlewares/authMiddleware.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./utils/swaggerDoc.js";

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.use("/api", apiRouter); // This line will route all url starting with /api to the api router

const swaggerDocs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/ping", isAuthenticate, (req, res) => {
  console.log(req.query);
  console.log(req.body);
  console.log(req.user);
  return res.json({ message: "pong" });
});

app.listen(PORT, () => {
  console.log("Server is running on https://localhost", PORT);
  connectDB();
});
