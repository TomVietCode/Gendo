import mongoose from "mongoose"

const otpSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expires: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Otp = mongoose.model("Otp", otpSchema, "otp")

export default Otp
