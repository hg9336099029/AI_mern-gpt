import { Router } from "express";
import userRoutes from "./userRoutes.js";
const appRouter = Router();
appRouter.use("/user", userRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map