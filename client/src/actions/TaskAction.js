export const initTask = () => {
  return {
    type: "INIT_TASK",
  }
}

export const deleteTask = (token, taskId) => {
  return {
    type: "DELETE_TASK",
    token: token, 
    taskId: taskId
  }
}

export const loading = () => {
  return {
    type: "LOADING"
  }
}