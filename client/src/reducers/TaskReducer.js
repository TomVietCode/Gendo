import { notification } from "antd"
import { removeTask } from "../services/TaskService"

const TaskReducer = (state = true, action) => {
  switch (action.type) {
    case "INIT_TASK":
      return !state
    case "DELETE_TASK":
      const result = removeTask(action.token, `${action.taskId}`)
      notification.success({
        message: "Deleted successfully!",
        placement: "top",
        duration: 2,
      })
      return !state
    default:
      return state
  }
}

export default TaskReducer