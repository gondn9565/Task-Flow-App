import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
const app = express();
const PORT = process.env.PORT || 4000;
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//DB connect
connectDB();
//Routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("API is running....");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
