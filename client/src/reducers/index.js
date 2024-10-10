import { combineReducers } from "redux"
import TaskReducer from "./TaskReducer"
import LoadReducer from "./LoadReducer"

const allReducer = combineReducers({
  TaskReducer,
  LoadReducer
})

export default allReducer