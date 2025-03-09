import { Express } from "express"
import { taskRoute } from "./task.route"
import { userRoute } from "./user.route"
import * as authMiddleware from '../middlewares/auth.middleware';

const indexRouter = (app: Express) => {
  const version: string = "/api/v1/"

  app.use(version + "task", authMiddleware.requireAuth, taskRoute)

  app.use(version + "user", userRoute)
}

export default indexRouter