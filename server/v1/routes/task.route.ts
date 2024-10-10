import express from "express"
const router = express.Router()

import * as controller from "../controllers/task.controller"

router.get("/", controller.index)

router.get("/detail/:id", controller.detail)

router.get("/sub-task/:taskId", controller.subTaskList)

router.patch('/change-status/:id', controller.changeStatus)

router.post('/create', controller.createTask)

router.patch('/edit/:id', controller.editTask)

router.delete('/delete/:id',controller.deleteTask)

router.patch("/add-user", controller.addUser)

router.get("/statistic/status", controller.statusStatistic)

export const taskRoute = router
