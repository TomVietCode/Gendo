import React, { useEffect, useState } from "react"
import {
  Button,
  Drawer,
  Row,
  Col,
  Avatar,
  Divider,
  Modal,
  Form,
  Input,
  notification,
} from "antd"
import { useNavigate } from "react-router-dom"
import { deleteCookie, getCookie } from "../../helpers/cookie"
import { patch } from "../../utils/request"

const UserProfileDrawer = ({ visible, setVisible, profileData, setProfileData, token }) => {
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm() // Tạo form

  const onClose = () => {
    setVisible(false) // Đóng Drawer
  }

  const showEditModal = () => {
    setIsModalVisible(true) // Hiện modal
  }

  const handleOk = () => {
    setIsModalVisible(false) // Đóng modal
    form.resetFields() // Reset form
  }

  const handleCancel = () => {
    setIsModalVisible(false) // Đóng modal
  }

  const handleFinish = async (data) => {
    const result = await patch(token, "user/edit", data)
    setIsModalVisible(false)
    if(result.code === 200){
      console.log(result)
      notification.success({
        message: result.message,
        placement: "top",
        duration: 2,
      })
      setProfileData(result.user)
    }else{
      notification.error({
        message: result.message,
        placement: "top",
        duration: 2,
      })
    }
  }
  const handleLogout = () => {
    deleteCookie("tokenUser")
    deleteCookie("id")
    navigate("/user/login") // Điều hướng đến trang đăng nhập
    notification.success({
      message: "Logged out successfully",
      placement: "top",
      duration: 2,
    })
  }

  return (
    <>
      <Drawer
        title="My Profile"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={400}
      >
        <div className="user-profile">
          <Avatar
            size={64}
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
            style={{
              marginBottom: 16,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Row>
            <Col span={24}>
              <p>
                <strong>Full Name:</strong> {profileData.fullName}
              </p>
              <p>
                <strong>Email:</strong> {profileData.email}
              </p>
              <p>
                <strong>Birthday:</strong>
                {profileData.birthday || "No data yet"}
              </p>
              <p>
                <strong>Address:</strong> {profileData.address || "No data yet"}
              </p>
              <p>
                <strong>Phone:</strong> {profileData.phone || "No data yet"}
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                {profileData.github ? (
                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileData.github}
                  </a>
                ) : (
                  "No data yet"
                )}
              </p>
            </Col>
          </Row>
          <Divider />
          <Button
            type="default"
            style={{ width: "100%", marginBottom: "10px" }}
            onClick={showEditModal} // Mở modal chỉnh sửa
          >
            Edit Profile
          </Button>
          <Button
            type="primary"
            danger
            style={{ width: "100%" }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </Drawer>

      {/* Modal Form cho Edit Profile */}
      <Modal title="Edit User Profile" visible={isModalVisible} onCancel={() => setIsModalVisible(false )}footer={null}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            fullName: profileData.fullName,
            email: profileData.email,
            birthday: profileData.birthday,
            address: profileData.address,
            phone: profileData.phone,
            github: profileData.github
          }}
          onFinish={handleFinish}
        >
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="birthday"
            label="Birthday"
          >
            <Input placeholder="Enter your birthday" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
          >
            <Input placeholder="Enter your address" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>
          <Form.Item
            name="github"
            label="Github"
          >
            <Input placeholder="Enter your Github link" />
          </Form.Item>
          <Form.Item style={{ marginLeft: "390px" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserProfileDrawer
