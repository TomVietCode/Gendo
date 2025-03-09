import { ParsedQs } from "qs"
import Task from "../src/models/taskModel"

const Pagination = async (query, id: string) => {
  const paginationObject: any = {
    currentPage: 1,
    limitItems: 8,
  }

  if (query.page) {
    paginationObject.currentPage = query.page
  }

  paginationObject.skip =
    (paginationObject.currentPage - 1) * paginationObject.limitItems

  const count: number = await Task.countDocuments({
    taskParentId: null,
    $or: [{ createdBy: id }, { listUser: id }],
    deleted: false
  })

  paginationObject.totalItems = count
  
  return paginationObject
}

export default Pagination