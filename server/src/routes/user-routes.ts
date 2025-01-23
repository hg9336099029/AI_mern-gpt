import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from "../controllers/user-controllers.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();
//@ts-ignore
userRoutes.get("/", getAllUsers);
//@ts-ignore 
userRoutes.post("/signup", validate(signupValidator), userSignup);
//@ts-ignore
userRoutes.post("/login", validate(loginValidator), userLogin);
//@ts-ignore
userRoutes.get("/auth-status", verifyToken, verifyUser);
//@ts-ignore
userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;
