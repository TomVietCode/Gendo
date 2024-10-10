import { Row, Col, Tag, Empty, notification } from "antd";
import moment from "moment";
import MenuDropdown from "../../components/MenuDropDown";
import { MoreOutlined } from "@ant-design/icons";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSkeleton } from "../Skeleton";
import EditTaskModal from "./EditTask";
import { useNavigate } from "react-router-dom";
import { deleteTask, initTask } from "../../actions/TaskAction";
import { useState } from "react";
import { changeStatus } from "../../services/TaskService";
import { getCookie } from "../../helpers/cookie";

function TaskList(props) {
  const { data, id, isSubTaskList } = props;
  const token = getCookie("tokenUser");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.LoadReducer);

  const [status, setStatus] = useState("");
  const [currentTask, setCurrentTask] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm trả về màu của trạng thái
  const getStatusColor = (status) => {
    return status === "finish"
      ? "green"
      : status === "pending"
      ? "volcano"
      : status === "initial"
      ? "blue"
      : status === "doing"
      ? "orange"
      : status === "notFinish"
      ? "red"
      : "gray";
  };

  const handleChangeStatus = async (record) => {
    // Logic để thay đổi status, ví dụ chuyển đổi qua các trạng thái
    let newStatus = "";
    switch (record.status) {
      case "initial":
        newStatus = "doing";
        break;
      case "doing":
        newStatus = "finish";
        break;
      case "finish":
        newStatus = "notFinish";
        break;
      case "notFinish":
        newStatus = "pending";
        break;
      case "pending":
        newStatus = "initial";
        break;
      default:
        newStatus = record.status;
    }

    record.status = newStatus;
    setStatus(record.status);
    notification.success({
      message: "Change status successfully!",
      placement: "top",
      duration: 2,
    });
    const result = await changeStatus(token, `change-status/${record._id}`, {
      status: newStatus,
    });
  };

  const handleClickAction = (e, task) => {
    switch (e.key) {
      case "edit":
        setCurrentTask(task);
        setIsModalOpen(true);
        console.log(isModalOpen)
        return;
      case "delete":
        dispatch(deleteTask(token, task._id));
        return;
      case "detail":
        navigate(`/task/detail/${task._id}`, { state: { task, id } });
        dispatch(initTask())
      default:
        return;
    }
  };

  // Các item cho dropdown
  const leaderOptions = [
    {
      key: "detail",
      label: (
        <span>
          <MdOutlineRemoveRedEye style={{ marginRight: 8 }} />
          View
        </span>
      ),
    },
    {
      key: "edit",
      label: (
        <span>
          <CiEdit style={{ marginRight: 8 }} />
          Edit
        </span>
      ),
    },
    {
      key: "delete",
      label: (
        <span>
          <MdDeleteOutline style={{ marginRight: 8 }} />
          Delete
        </span>
      ),
    },
  ];
  const memberOption = [
    {
      key: "detail",
      label: (
        <span>
          <MdOutlineRemoveRedEye style={{ marginRight: 8 }} />
          View
        </span>
      ),
    },
  ];

  const renderRow = (record) => (
    <Row
      className="Row title-row"
      key={record._id}
      gutter={[16, 16]}
      style={{ border: "none", height: "2.5rem" }}
    >
      <Col xs={3} sm={2} md={1} lg={1} xl={1} xxl={1}></Col>
      <Col xs={12} sm={10} md={7} lg={7} xl={7} xxl={7}>
        {record.title}
      </Col>
      {!isSubTaskList && (
        <Col
          xs={4}
          sm={3}
          md={2}
          lg={2}
          xl={2}
          xxl={2}
          style={{ textAlign: "center" }}
        >
          {record.totalSubTask}
        </Col>
      )}
      {!isSubTaskList && (
        <Col
          xs={6}
          sm={4}
          md={3}
          lg={3}
          xl={3}
          xxl={3}
          style={{ textAlign: "center" }}
        >
          <Tag color={record.createdBy === id ? "red" : "green"}>
            {record.createdBy === id ? "Leader" : "Member"}
          </Tag>
        </Col>
      )}
      <Col
        xs={6}
        sm={4}
        md={3}
        lg={3}
        xl={3}
        xxl={3}
        style={{ textAlign: "center" }}
      >
        {moment(record.timeStart).format("DD-MM-YYYY HH:mm")}
      </Col>
      <Col
        xs={6}
        sm={4}
        md={3}
        lg={3}
        xl={3}
        xxl={3}
        style={{ textAlign: "center" }}
      >
        {moment(record.timeStart).format("DD-MM-YYYY HH:mm")}
      </Col>
      <Col
        xs={6}
        sm={4}
        md={3}
        lg={3}
        xl={3}
        xxl={3}
        style={{ textAlign: "center" }}
      >
        <Tag
          style={{ cursor: "pointer", userSelect: "none" }}
          color={getStatusColor(record.status)}
          onClick={() => handleChangeStatus(record)}
        >
          {record.status}
        </Tag>
      </Col>
      <Col xs={2} sm={2} md={1} lg={1} xl={1} xxl={1}>
        <MenuDropdown
          items={
            record.taskParentId
              ? leaderOptions
              : record.createdBy === id
              ? leaderOptions
              : memberOption
          }
          triggerElement={
            <span style={{ border: "none", cursor: "pointer" }}>
              <MoreOutlined />
            </span>
          }
          getSelection={(e) => handleClickAction(e, record)}
        />
      </Col>
      <EditTaskModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        item={currentTask}
        token={token}
      />
    </Row>
  );
  const renderRowDetail = (record) => (
    <Row
      className="Row title-row"
      key={record._id}
      gutter={[16, 16]}
      style={{ border: "none", height: "2.5rem" }}
    >
      <Col xs={3} sm={2} md={1} lg={1} xl={1} xxl={1}></Col>
      <Col xs={10} sm={10} md={7} lg={7} xl={7} xxl={7}>
        {record.title}
      </Col>
      <Col
        xs={4}
        sm={4}
        md={5}
        lg={5}
        xl={5}
        xxl={6}
        style={{ textAlign: "center" }}
      >
        {moment(record.timeStart).format("DD-MM-YYYY HH:mm")}
      </Col>
      <Col
        xs={4}
        sm={4}
        md={5}
        lg={5}
        xl={5}
        xxl={6}
        style={{ textAlign: "center" }}
      >
        {moment(record.timeFinish).format("DD-MM-YYYY HH:mm")}
      </Col>
      <Col
        xs={3}
        sm={3}
        md={5}
        lg={5}
        xl={5}
        xxl={3}
        style={{ textAlign: "center" }}
      >
        <Tag
          style={{ cursor: "pointer", userSelect: "none" }}
          color={getStatusColor(record.status)}
          onClick={() => handleChangeStatus(record)}
        >
          {record.status}
        </Tag>
      </Col>
      <Col xs={2} sm={2} md={1} lg={1} xl={1} xxl={1}>
        <MenuDropdown
          items={
            record.taskParentId
              ? leaderOptions
              : record.createdBy === id
              ? leaderOptions
              : memberOption
          }
          triggerElement={
            <span style={{ border: "none", cursor: "pointer" }}>
              <MoreOutlined />
            </span>
          }
          getSelection={(e) => handleClickAction(e, record)}
        />
      </Col>
      <EditTaskModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        item={currentTask}
        token={token}
      />
    </Row>
  );

  const RowTask = () => {
    return (
      <>
        <Row
          className="Title-row"
          gutter={[16, 16]}
          style={{ fontWeight: "bold" }}
        >
          <Col xs={3} sm={2} md={1} lg={1} xl={1} xxl={1}></Col>
          <Col xs={12} sm={10} md={7} lg={7} xl={7} xxl={7}>
            Task Name
          </Col>
          <Col
            xs={4}
            sm={3}
            md={2}
            lg={2}
            xl={2}
            xxl={2}
            style={{ textAlign: "center" }}
          >
            Sub Tasks
          </Col>
          <Col
            xs={6}
            sm={4}
            md={3}
            lg={3}
            xl={3}
            xxl={3}
            style={{ textAlign: "center" }}
          >
            Role
          </Col>
          <Col
            xs={6}
            sm={4}
            md={3}
            lg={3}
            xl={3}
            xxl={3}
            style={{ textAlign: "center" }}
          >
            Start Time
          </Col>
          <Col
            xs={6}
            sm={4}
            md={3}
            lg={3}
            xl={3}
            xxl={3}
            style={{ textAlign: "center" }}
          >
            Deadline
          </Col>
          <Col
            xs={6}
            sm={4}
            md={3}
            lg={3}
            xl={3}
            xxl={3}
            style={{ textAlign: "center" }}
          >
            Status
          </Col>
        </Row>
        
      </>
    );
  };
  const RowTaskdetail = () => {
    return (
      <>
        <Row
          className="Title-row"
          gutter={[16, 16]}
          style={{ fontWeight: "bold" }}
        >
          <Col xs={2} sm={2} md={1} lg={1} xl={1} xxl={1}></Col>
          <Col xs={10} sm={10} md={7} lg={7} xl={7} xxl={7}>
            Task Name
          </Col>
          <Col
            xs={4}
            sm={4}
            md={5}
            lg={5}
            xl={5}
            xxl={6}
            style={{ textAlign: "center" }}
          >
            Start Time
          </Col>
          <Col
            xs={4}
            sm={4}
            md={5}
            lg={5}
            xl={5}
            xxl={6}
            style={{ textAlign: "center" }}
          >
            Deadline
          </Col>
          <Col
            xs={3}
            sm={3}
            md={5}
            lg={5}
            xl={5}
            xxl={3}
            style={{ textAlign: "center" }}
          >
            Status
          </Col>
        </Row>
        
      </>
    );
  };

  return (
    <>
      {!isSubTaskList ? RowTask() : RowTaskdetail()}
      
      
      {state ? (
        <LoadingSkeleton />
      ) : (
        data &&
        data.taskList &&
        (data.taskList.length > 0 ? (
          data.taskList.map((record) => !isSubTaskList ? renderRow(record) : renderRowDetail(record))
        ) : (
          <Empty style={{ marginTop: 100 }} />
        ))
      )}
    </>
  );
}

export default TaskList;
