import {
  signinController,
  signupController,
  userIsLoggedController,
} from "./authController.js";
import express from "express";

const authRoute = express.Router();

authRoute.post("/api/signup", signupController);
authRoute.post("/api/signin", signinController);
authRoute.get("/api/userIsLogged", userIsLoggedController);

export default authRoute;
