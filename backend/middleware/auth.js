import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
// const jwtSecret = process.env.JWT_SECRET || "your jwt secret here";
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not defined in environment variables");
}
const jwtSecret = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  //Grab the bearer token from authentication header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized,token missing" });
  }
  const token = authHeader.split(" ")[1];
  //VERIFY AND ATTACK USER OBJECT
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    console.error("JWT verification failed", error);
    return res
      .status(401)
      .json({ success: false, message: "Token invalid or expired" });
  }
};
