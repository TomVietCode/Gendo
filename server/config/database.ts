import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database Connected!")
  } catch (error) {
    console.log("Can't connect to database!")
  }
}