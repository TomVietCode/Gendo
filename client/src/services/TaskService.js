import { get, patch, post, del } from '../utils/request'

export const getTaskList = async (token, path) => {
  const result = await get(token, `task${path}`)
  return result
}


export const getTaskDetail = async (token, id) => {
  const result = await get(token, `task/detail/${id}`)  
  return result
}

export const addTask = async (token, path, data) => {
  const result = await post(token, "task/" + path, data)
  return result
}

export const changeStatus = async (token, path, data) => {
  const result = await patch(token, "task/" + path, data)
  return result
}

export const removeTask = async(token, path) => {
  const result = await del(token, `task/delete/` + path)
  return result
}

