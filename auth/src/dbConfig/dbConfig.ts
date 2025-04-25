import mongoose from "mongoose";

export async function connect() {
//   if (mongoose.connection.readyState >= 1) {
//     console.log(" Already connected to MongoDB.");
//     return;
//   }

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log(" MongoDB connected successfully.");
  });

  connection.on("error", (error) => {
    console.error(" MongoDB connection error:", error);
    process.exit(1);
  });

  try {
    await mongoose.connect(process.env.MONGO_URL!);
  } catch (error) {
    console.error(" MongoDB initial connection failed:", error);
    process.exit(1);
  }
}
