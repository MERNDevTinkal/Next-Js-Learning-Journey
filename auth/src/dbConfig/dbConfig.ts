import mongoose from "mongoose";

export async function connect() {
    
    try {
      await mongoose.connect(process.env.MONGO_URL!);
  
      const connection = mongoose.connection;
  
      connection.on("connected", () => {
        console.log(" MongoDB connected successfully");
      });
  
      connection.on("error", (error) => {
        console.log(" MongoDB runtime connection error:", error);
        process.exit(1);
      });
    } catch (error) {
      console.log(" MongoDB connection setup failed:", error);
      process.exit(1);
    }
  }
  