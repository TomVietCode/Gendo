import React from "react"
import { Modal, Form, Input, DatePicker, Col, Button, Row, notification } from "antd"
import "./edit.scss"
import moment from "moment"
import { patch } from "../../utils/request"
import { useDispatch } from "react-redux"
import { initTask } from "../../actions/TaskAction"

const EditTaskModal = (props) => {
  const { visible, onClose, item, token } = props
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const handleSubmit = async (formData) => {
    onClose()
    const result = await patch(token, `task/edit/${item._id}`, formData)
    if(result.code === 200){
      notification.success({
        message: "Task update successfully!",
        placement: "top",
        duration: 3,
      })
      dispatch(initTask())
    }else {
      notification.error({
        message: "Task update failed!",
        placement: "top",
        duration: 3,
      })
    }
  }

  if(visible === true){
    form.setFieldsValue({
      title: item.title,
      content: item.content,
      timeStart: moment(item.timeStart),
      timeFinish: moment(item.timeFinish)
    })
  }

  return (
    <Modal
      title="Edit Task"
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="edit-task-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Task Name"
          name="title"
          rules={[{ message: "Please enter the task title!" }]}
        >
          <Input placeholder="Enter task title"/>
        </Form.Item>
        <div>
          <p>Description</p>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Please enter project description!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Enter project description"
              className="login__form-group-input form-control"
              rows={4}
            />
          </Form.Item>
        </div>
        <Row gutter={32}>
          <Col span={12}>
            <p>Date Create</p>
            <Form.Item
              name="timeStart"
              rules={[
                { required: true, message: "Please select create date!" },
              ]}
            >
              <DatePicker
                placeholder="Select create date"
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <p>Deadline</p>
            <Form.Item
              name="timeFinish"
              rules={[{ required: true, message: "Please select due date!" }]}
            >
              <DatePicker
                placeholder="Select create date"
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="edit-task-button">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditTaskModal
