import nodemailer from "nodemailer"

export const sendMail = async (
  email: string,
  subject: string,
  html: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: email,
    subject: subject,
    html: html,
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error)
        resolve(error)
      } else {
        console.log("Email sent: " + info.response)
        resolve(info)
      }
    })
  })
}
