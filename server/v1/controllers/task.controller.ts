import { Request, Response } from "express";
import Task from "../models/task.model"

export const index = async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false
  })

  res.json(tasks)
}