import { Express } from "express"
import { taskRoute } from "./task.route"
import { userRoute } from "./user.route"

const indexRouter = (app: Express) => {
  const version: string = "/api/v1/"

  app.use(version + "task", taskRoute)

  app.use(version + "user", userRoute)
  
}

export default indexRouter