import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 25,
      minlength: 6,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default:
        "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
    },
    projects: [
      {
        type: mongoose.Types.ObjectId,
        ref: "projects",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("users", userSchema)
