import { Request, Response } from "express"
import User from "../models/userModel"
import md5 from "md5"
import {
  generateRandomNumber,
  generateRandomString,
} from "../../helpers/generate.helper"
import Otp from "../models/otp.model"
import { sendMail } from "../../helpers/sendMail.hepler"

interface User {
  _id?: string
  fullName: string
  email: string
  password: string
  token: string
}

// [POST] /api/v1/user/register
export const register = async (req: Request, res: Response) => {
  const email: string = req.body.email
  const password: string = req.body.password
  const fullName: string = req.body.fullName

  const isEmailExist = await User.findOne({
    email: email,
  })

  if (isEmailExist) {
    res.json({
      code: 400,
    })
    return
  }

  const newUser: User = {
    fullName: fullName,
    email: email,
    password: md5(password),
    token: generateRandomString(20),
  }

  const savedUser = await User.create(newUser)

  res.json({
    code: 400,
    token: savedUser.token,
    id: savedUser._id,
  })
}

// [POST] /api/v1/user/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existUser = await User.findOne({
    email: email,
  })

  if (!existUser) {
    res.json({
      code: 400,
    })
    return
  }

  if (md5(password) !== existUser.password) {
    res.json({
      code: 400,
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

// [POST] /api/v1/user/password/forgot
export const forgotPass = async (req: Request, res: Response) => {
  const email = req.body.email
  const otp = generateRandomNumber(6)

  const existUser = await User.findOne({
    email: email,
  })

  if (existUser) {
    const objectOtp = new Otp({
      email: email,
      otp: otp,
      expireAt: Date.now() + 5 * 60 * 1000,
    })

    await objectOtp.save()

    const subject = "Mã xác nhận OTP"
    const html = `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">GENDO</a>
          </div>
          <p style="font-size:1.1em">Xin chào ${existUser.fullName},</p>
          <p>Dưới đây là mã OTP xác thực để đổi mật khẩu. Vui lòng không chia sẻ cho bất kỳ ai. Mã OTP có hiệu lực trong 5 phút!</p>
          <h2
              style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
              ${objectOtp.otp}</h2>
          <p style="font-size:0.9em;">Trân trọng,<br />CELLO</p>
          <hr style="border:none;border-top:1px solid #eee" />`

    await sendMail(email, subject, html)

    res.json({
      code: 200,
      message: "OTP code has been sent to your email!",
    })
  } else {
    res.json({
      code: 400,
      message: "Email does not exist in our system!",
    })
  }
}

// [POST] /api/v1/user/password/otp
export const otpAuth = async (req: Request, res: Response) => {
  const email: string = req.body.email
  const otp: string = req.body.otp

  const existOtp = await Otp.findOne({
    email: email,
    otp: otp,
  })

  if (existOtp) {
    const user = await User.findOne({
      email: email,
    })

    res.json({
      code: 200,
      token: user.token,
    })
  } else {
    res.json({
      code: 400,
      message: "OTP code is not correct!",
    })
  }
}

// [POST] /api/v1/user/password/reset
export const resetPassword = async (req: Request, res: Response) => {
  const token: string = res.locals.user.token
  const newPassword: string = req.body.password

  await User.updateOne(
    {
      token: token,
    },
    {
      password: md5(newPassword),
    }
  )

  res.json({
    code: 200,
    message: "Reset password successfully!",
  })
}

// [GET] /api/v1/user/profile
export const profile = async (req: Request, res: Response) => {
  res.json({
    code: 200,
    info: res.locals.user,
  })
}

// [PATCH] /api/v1/user/edit
export const editProfile = async (req: Request, res: Response) => {
  try {
    await User.updateOne(
      {
        _id: res.locals.user.id,
      },
      req.body
    )

    const user = await User.findOne({ _id: res.locals.user.id })
    res.json({
      code: 200,
      message: "Updated profile successfully!",
      user: user,
    })
  } catch (error) {
    res.json({
      error: error.message,
      code: 400,
      message: "Updated profile failed!",
    })
  }
}

// [GET] /api/v1/user/list
export const userList = async (req: Request, res: Response) => {
  let users = []

  if (req.query.keyword) {
    const keyword: RegExp = new RegExp(`${req.query.keyword}`, "i")

    users = await User.find({ fullName: keyword })
      .select("id fullname email")
      .limit(7)
  }

  res.json({
    code: 200,
    users: users,
  })
}
