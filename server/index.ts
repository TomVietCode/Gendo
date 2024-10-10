import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import bodyParser from "body-parser";
import cors from "cors"
import { connectDb } from "./config/database";
import indexRouter from "./v1/routes/index.route";
const app: Express = express()
const port: string = process.env.PORT

connectDb()

// Body parser
app.use(bodyParser.json())

// CORS
app.use(cors())

indexRouter(app)

app.listen(port, () => {
  console.log("App is listening on port " + process.env.PORT)
})