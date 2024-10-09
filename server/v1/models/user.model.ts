import mongoose from "mongoose"
import { deflate } from "zlib"

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    address: String,
    token: String,
    birthday: String,
    github: String,
    phone: String,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema, "users")

export default User