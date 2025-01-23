import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controllers.js";
import { loginValidator, SignupValidator, validator } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validator(SignupValidator), userSignup);
userRoutes.post("/login", validator(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, userLogin);
export default userRoutes;
//# sourceMappingURL=userRoutes.js.map