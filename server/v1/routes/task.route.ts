import express from "express"
const router = express.Router()

import * as controller from "../controllers/task.controller"

router.get("/", controller.index)

export const taskRoute = router