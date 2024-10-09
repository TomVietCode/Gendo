import { Request, Response } from "express"
import Task from "../models/task.model"
import Pagination from "../../helpers/pagination.helper"

// [GET] /api/v1/task
export const index = async (req: Request, res: Response) => {
  interface Find {
    deleted: boolean
    status?: string
    title?: RegExp
  }

  const find: Find = {
    deleted: false,
  }

  // Lọc theo trạng thái
  if (req.query.status) {
    find["status"] = req.query.status.toString()
  }

  // Sắp xếp
  const sort: any = {}
  if (req.query.sortKey && req.query.sortValue) {
    sort[`${req.query.sortKey}`] = req.query.sortValue
  } else {
    sort["createdAt"] = "desc"
  }

  // Tìm kiếm
  if (req.query.keyword) {
    const regex: RegExp = new RegExp(`${req.query.keyword}`, "i")
    find["title"] = regex
  }

  // Phân trang
  const paginationObject: any = await Pagination(
    req.query,
    "66cf43f35b14a9a677275e5d"
  )

  const tasks = await Task.find(find)
    .collation({ locale: "en" })
    .sort(sort)
    .skip(paginationObject.skip)
    .limit(paginationObject.limitItems)

  for (let item of tasks) {
    const totalSubTask: number = await Task.countDocuments({
      deleted: false,
      taskParentId: item._id
    })

    item.totalSubTask = totalSubTask
  }
  
  res.json({
    taskList: tasks,
    totalPage: paginationObject.totalPage,
    totalItems: paginationObject.totalItem,
    limitItem: paginationObject.limitItems,
  })
}

// [GET] /api/v1/task/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id

  const taskDetail = await Task.findOne({
    _id: id,
    deleted: false,
  })

  if(req.query.members) {
    res.json({
      code: 200,
      members: taskDetail.listUser
    })
    return
  }

  res.json({
    code: 200,
    detail: taskDetail
  })
}

// [PATCH] /api/v1/task/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
  const id: string = req.params.id
  const status: string = req.params.status

  await Task.updateOne({
    _id: id
  }, {
    status: status
  })

  res.json({
    code: 200,
    message: "Cập nhật thành công",
  })
}