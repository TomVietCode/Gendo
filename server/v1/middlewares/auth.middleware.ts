import { NextFunction, Request, Response } from "express"
import User from "../models/user.model"

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.headers.authorization) {
    const token: string = req.headers.authorization.split(" ")[1]
    const user = await User.findOne({
      token: token,
    }).select("-password")
    if (!user) {
      res.json({
        code: 400,
        message: "Token không hợp lệ",
      })
      return
    }

    res.locals.user = user

    next()
  } else {
    res.json({
      code: 400,
      message: "Vui lòng gửi kèm theo token",
    })
  }
}

