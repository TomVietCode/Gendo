import { Request, Response } from "express";
import User from "../models/user.model";
import md5 from "md5"
import { generateRandomString } from './../../helpers/generate.helper';

interface User {
  _id?: string
  fullName: string,
  email: string,
  password: string,
  token: string
}

// [POST] /api/v1/user/register
export const register = async (req: Request, res: Response) => {
  const email: string = req.body.email
  const password: string = req.body.password
  const fullName: string = req.body.fullName

  const isEmailExist = await User.findOne({
    email: email
  })

  if(isEmailExist) {
    res.json({
      code: 400,
    })
    return
  }

  const newUser: User = {
    fullName: fullName,
    email: email,
    password: md5(password),
    token: generateRandomString(20)
  }

  const savedUser = await User.create(newUser)

  res.json({
    code: 400,
    token: savedUser.token,
    id: savedUser._id
  })
}

// [POST] /api/v1/user/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existUser = await User.findOne({
    email: email
  })

  if(!existUser) {
    res.json({
      code: 400
    })
    return
  }

  if(md5(password) !== existUser.password){
    res.json({
      code: 400
    })
    return
  }

  res.json({
    code: 200,
    message: "Đăng nhập thành công",
    token: existUser.token,
    id: existUser._id,
  })
}