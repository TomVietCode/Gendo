import exp from "constants"
import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeFinish: Date,
    listUser: Array,
    createdBy:String,
    taskParentId: String,
    totalSubTask: Number,
    deleted:{
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.model("Task", taskSchema, "tasks")

export default Task