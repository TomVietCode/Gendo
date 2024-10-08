import { Express } from "express"
import { taskRoute } from "./task.route"

const indexRouter = (app: Express) => {
  const version: string = "/api/v1/"

  app.use(version + "task", taskRoute)
}

export default indexRouter