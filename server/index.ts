import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()

const app: Express = express()
const port: string = process.env.PORT

app.get("/", (req: Request, res: Response) => {
  res.json("oke")
})

app.listen(port, () => {
  console.log("App is listening on port " + process.env.PORT)
})