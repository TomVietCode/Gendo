import React, { useState } from "react"
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Typography,
} from "antd"
import { postPublic } from "../../utils/request"
import ResetPasswordModal from "./ReserPassword"
const { Title } = Typography

const OTPform = ({ visible, onClose, email }) => {
  const [isResetVisible, setIsResetVisible] = useState(false)
  const [otp, setOtp] = useState("")
  const [token, setToken] = useState("")
  const onChange = (text) => {
    setOtp(text)
  }

  const sharedProps = {
    onChange,
  }

  // Gửi OTP cho backend
  const handleSendOtp = async () => {
    const dataSubmit = {
      email: email.email,
      otp: otp,
    }
    const result = await postPublic("user/password/otp", dataSubmit)
    if (result.code === 200) {
      setToken(result.token)
      onClose()
      setIsResetVisible(true)
    } else {
      notification.error({
        message: result.message,
        placement: "top",
        duration: 3,
      })
    }
  }

  return (
    <>
      <Modal visible={visible} onCancel={onClose} footer ={null}>
        <Form onFinish={handleSendOtp}>
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "This field cannot be empty!" }]}
          >
            <Flex  gap="middle" align="center" vertical>
              <Title level={5}>Enter your OTP</Title>
              <p>Please enter the OTP code that we have sent to your email.</p>
              <Input.OTP length={6} {...sharedProps} />
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ResetPasswordModal visible={isResetVisible} onClose={() => setIsResetVisible(false)} token={token}/>
    </>
  )
}
export default OTPform
