import express from "express"
const router = express.Router()

import * as controller from "../controllers/user.controller"
import * as authMiddleware from "../middlewares/auth.middleware"

router.post("/register", controller.register)

router.post("/login", controller.login)

router.post("/password/forgot", controller.forgotPass)

router.post("/password/otp", controller.otpAuth)

router.post("/password/reset", authMiddleware.requireAuth ,controller.resetPassword)

router.get("/profile", controller.profile)

router.patch("/edit", controller.editProfile)

router.get("/list", controller.userList)

export const userRoute = router