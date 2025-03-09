import React, { useState } from "react"
import { Modal, Form, Input, Button, notification } from "antd"
import { patch } from "../../utils/request"

const ResetPasswordModal = ({ visible, onClose, token }) => {
  const [form] = Form.useForm()

  const handleSubmit = async (value) => {
    const result = await patch(token, "user/password/reset", {
      password: value.password,
    })
    if(result.code === 200){
      notification.success({
        message: result.message,
        placement: "top",
        duration: 3,
      })
      onClose()
    }
  }

  return (
    <Modal
      title="Reset Password"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
            { min: 6, message: "Password must be at least 6 characters." },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="password"
          rules={[
            { required: true, message: "Please confirm your password!" },
            {
              validator: (_, value) =>
                value && value !== form.getFieldValue("newPassword")
                  ? Promise.reject(new Error("Passwords do not match!"))
                  : Promise.resolve(),
            },
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ResetPasswordModal
