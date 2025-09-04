import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
  updatePassword,
} from "../controllers/userController.js";
const userRouter = express.Router();
//PUBLIC LINKS
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
//PRIVATE LINKS protect also by authMiddleware
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/profile", authMiddleware, updateUserProfile);
userRouter.put("/password", authMiddleware, updatePassword);
export default userRouter;
