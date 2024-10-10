import {
  notification,
  Modal,
  Button,
  Space,
  Input,
  DatePicker,
  Row,
  Col,
  Form,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getCookie } from "../../helpers/cookie";
import "./style.scss";
import { addTask } from "../../services/TaskService";
import { useDispatch } from "react-redux";
import { initTask } from "../../actions/TaskAction";

function CreateTask({ name, isCreateSubTask, parentTaskId }) {
  //thêm project
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = getCookie("tokenUser");
  const id = getCookie("id");
  const [form] = Form.useForm();

  const openModal = () => setIsModalOpen(true);
  const cancelCloseModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // Hàm xử lý khi form được submit thành công
  const handleFinish = async (values) => {
    const dataSubmit = {
      ...values,
      status: "initial",
      createdBy: id,
      taskParentId: parentTaskId ? parentTaskId : null
    };

    const result = await addTask(token, "create", dataSubmit);

    if (result.code === 200) {
      dispatch(initTask());
      notification.success({
        message: !isCreateSubTask ? "Task created successfully!" : "Sub Task created successfully!",
        placement: "top",
        duration: 3,
      });
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <Button size="large" type="primary" onClick={openModal}>
        <PlusOutlined />
          {name}
      </Button>
      <Modal
        className="Modal"
        title={!isCreateSubTask ? "Create New Task" : "Create New Sub Task"}
        open={isModalOpen}
        onCancel={cancelCloseModal}
        width={1000}
        footer={null} // Ẩn footer vì Ant Design Form sẽ xử lý việc submit
      >
        <Form
          className="project-form"
          form={form}
          onFinish={handleFinish} // Sử dụng onFinish để submit form
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <p>Task Name</p>
              <Form.Item
                name="title"
                rules={[
                  { required: true, message: "Please enter project name!" },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter project name"
                  className="login__form-group-input form-control"
                />
              </Form.Item>
            </div>

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

            <Row gutter={16}>
              <Col span={8}>
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
              <Col span={8}>
                <p>Deadline</p>
                <Form.Item
                  name="timeFinish"
                  rules={[
                    { required: true, message: "Please select due date!" },
                  ]}
                >
                  <DatePicker
                    placeholder="Select create date"
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Space>

          <div style={{ textAlign: "right" }}>
            <Button key="cancel" onClick={cancelCloseModal}>
              Cancel
            </Button>
            <Button
              key="create"
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 8 }}
            >
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default CreateTask;
