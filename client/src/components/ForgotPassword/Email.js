/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Button, Form, Input, Modal, notification } from "antd"
import { useState } from "react"
import { postPublic } from "../../utils/request"
import OTPform from "./OTP"
function TypeEmail() {
  const [email, setEmail] = useState("")
  const [isEmailOpen, setIsEmailOpen] = useState(false)
  const [isOtpVisible, setIsOtpVisible] = useState(false)

  const openModal = () => setIsEmailOpen(true)
  const cancelCloseModal = () => setIsEmailOpen(false)

  const handleSendEmail = async (value) => {
    setEmail(value)
    const result = await postPublic("user/password/forgotpass", value)
    if (result.code === 400) {
      notification.error({
        message: result.message,
        placement: "top",
        duration: 3,
      })
    } else {
      notification.success({
        message: result.message,
        placement: "top",
        duration: 3,
      })
      setIsEmailOpen(false)
      setIsOtpVisible(true)
    }
  }
  return (
    <>
      <a
        href="#"
        className="login__forgot-password"
        onClick={() => {
          openModal()
        }}
      >
        Forgot Password?
      </a>
      <Modal
        title="Forgot Password"
        open={isEmailOpen}
        onCancel={cancelCloseModal}
        footer ={null}
      >
        <p>To get new password, please enter your email address.</p>
        <Form onFinish={handleSendEmail}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              type="email"
              rules={[{ type: "email" }]}
              placeholder="Ex: abc@gmail.com"
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <OTPform visible={isOtpVisible} onClose={() => setIsOtpVisible(false)} email={email}/>
    </>
  )
}

export default TypeEmail
