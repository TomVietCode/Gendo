import { Request, Response } from "express"
import Task from "../models/taskModel"
import Pagination from "../../helpers/pagination.helper"

interface Task {
  title: string
  content: string
  timeStart: string
  timeFinish: string
  createdBy?: string
  listUser?: any
}

// [GET] /api/v1/task
export const index = async (req: Request, res: Response) => {
  const user = res.locals.user
  const find: object = {
    taskParentId: null,
    $or: [
      { createdBy: user._id },
      { listUser: { $elemMatch: { id: user._id } } },
    ],
  }

  // Lọc theo trạng thái
  if (req.query.status) {
    if (req.query.status === "leader") {
      find["createdBy"] = user._id
    } else if (req.query.status === "member") {
      find["createdBy"] = { $ne: user._id }
    } else {
      find["status"] = req.query.status
    }
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
  const paginationObject: any = await Pagination(req.query, user._id)

  const tasks = await Task.find(find)
    .collation({ locale: "en" })
    .sort(sort)
    .skip(paginationObject.skip)
    .limit(paginationObject.limitItems)

  for (let item of tasks) {
    const totalSubTask: number = await Task.countDocuments({
      deleted: false,
      taskParentId: item._id,
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

// [GET] /task/sub-task/:id
export const subTaskList = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId
  const listSubTask = await Task.find({
    taskParentId: taskId,
    deleted: false,
  }).sort({ createdAt: "desc" })

  res.json(listSubTask)
}

// [GET] /api/v1/task/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id

  const taskDetail = await Task.findOne({
    _id: id,
    deleted: false,
  })

  if (req.query.members) {
    res.json({
      code: 200,
      members: taskDetail.listUser,
    })
    return
  }

  res.json({
    code: 200,
    detail: taskDetail,
  })
}

// [PATCH] /api/v1/task/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
  const id: string = req.params.id
  const status: string = req.params.status

  await Task.updateOne(
    {
      _id: id,
    },
    {
      status: status,
    }
  )

  res.json({
    code: 200,
    message: "Cập nhật thành công",
  })
}

//[POST] /api/v1/task/create
export const createTask = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    const dataBody: Task = req.body
    dataBody.createdBy = user._id
    dataBody.listUser = [
      { id: user._id, fullname: user.fullName, email: user.email },
    ]

    const task = new Task(dataBody)
    await task.save()

    res.json({
      code: 200,
      taskNew: task,
    })
  } catch (error) {
    res.json({
      code: 400,
    })
  }
}

//[PATCH] /api/v1/task/edit/:id
export const editTask = async (req: Request, res: Response) => {
  try {
    const dataBody: Task = req.body
    await Task.updateOne(
      {
        _id: req.params.id,
      },
      dataBody
    )
    res.json({
      code: 200,
    })
  } catch (error) {
    res.json({
      code: 400,
    })
  }
}

//[DELETE] /api/v1/task/delete
export const deleteTask = async (req: Request, res: Response) => {
  try {
    await Task.deleteOne({
      _id: req.params.id,
    })
    res.json({
      code: 200,
    })
  } catch (error) {
    res.json({
      code: 400,
    })
  }
}

// [PATCH] /task/add-user
export const addUser = async (req: Request, res: Response) => {
  try {
    const userEmail: string = req.body.email
    const taskId: string = req.body.taskId
    const fullName: string = req.body.fullname
    await Task.updateOne(
      {
        _id: taskId,
      },
      {
        $push: {
          listUser: { id: req.body._id, fullName: fullName, email: userEmail },
        },
      }
    )

    res.json({
      code: 200,
      message: "Member added successfully!",
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Member added failed!",
    })
  }
}

// [GET] /task/statistics/status
export const statusStatistic = async (req: Request, res: Response) => {
  const user = res.locals.user
  const summary: any = await Task.aggregate([
    {
      $match: {
        $or: [
          { createdBy: user._id },
          { listUser: { $elemMatch: { id: user._id } } },
        ],
      },
    },
    {
      $group: {
        _id: "status",
        value: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        value: 1,
      },
    },
  ])

  res.json(summary)
}
