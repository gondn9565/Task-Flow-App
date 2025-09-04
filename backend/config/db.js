import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB connected");
  });
};
// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`MongoDB connection failed: ${error.message}`);
//     process.exit(1); // Stop server if DB connection fails
//   }
// };
