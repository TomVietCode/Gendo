import { Tabs, Tag } from "antd";
import "./TaskDetail.scss";
import TimeLine from "../../components/TimeLine";
import CreateTask from "../../components/Task/CreateTask";
import MemberManagement from "../../components/MemberManagement";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskList } from "../../services/TaskService";
import { getCookie } from "../../helpers/cookie";
import moment from "moment";
import TaskList from "../../components/Task/TaskList";
import { useSelector } from "react-redux";

const TaskDetail = () => {
  const token = getCookie("tokenUser");
  const location = useLocation();
  const state = useSelector((state) => state.TaskReducer);
  const { task, id } = location.state || {};
  const [subTasks, setsubTasks] = useState({});
  const isLeader = id === task.createdBy;

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

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTaskList(token, `/sub-task/${task._id}`);
      setsubTasks({ taskList: [...result] });
    };
    fetchApi();
  }, [state]);

  const items = [
    {
      key: "1",
      label: "List Sub Tasks",
      children: (
        <div
          style={{
            width: "100%",
            height: "100vh",
            textAlign: "center",
            background: "rgba(0,255,0,0.02)",
          }}
        >
          <TaskList isSubTaskList={true} data={subTasks} />
        </div>
      ),
    },
    {
      key: "2",
      label: "Comment",
      children: (
        <div
          style={{
            width: "100%",
            height: "100vh",
            textAlign: "center",
            background: "rgba(0,0,255,0.02)",
          }}
        ></div>
      ),
    },
  ];

  return (
    <>
      <div className="Container">
        <div className="Container__firstBox">
          <div className="box1">
            <div className="TaskNameDetail">
              <span className="taskName">
                Task Name: <span className="name">{task.title}</span>
              </span>
            </div>
            <div className="StatusTaskName">
              <p style={{ fontWeight: "bold", fontSize : "1.3rem"}}>
                <Tag
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                    marginLeft: "10px",
                    
                  }}
                  color={getStatusColor(task.status)}
                >
                  {task.status}
                </Tag>
              </p>
            </div>
          </div>
          {!task.taskParentId && (
            <p style={{ fontWeight: "bold"}}>
              Role:
              <Tag
                color={task.createdBy === id ? "red" : "green"}
                style={{ marginLeft: "10px" }}
              >
                {task.createdBy === id ? "Leader" : "Member"}
              </Tag>
            </p>
          )}
          <div className="box2">
            <p style={{ fontWeight: "bold"}}>Description:</p>
            <span className="Description">{task.content}</span>
          </div>
          <div className="box3">
            <div className="TimeStart">
              <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
                Time Start:{" "}
              </span>
              <span>
                {task && moment(task.timeStart).format("DD-MM-YYYY HH:mm")}
              </span>
            </div>
            <div className="Deadline">
              <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
                Deadline:{" "}
              </span>{" "}
              <span>
                {task && moment(task.timeFinish).format("DD-MM-YYYY HH:mm")}
              </span>
            </div>
          </div>
          <div className="box4">
            <div className="CreatTask">
              <CreateTask
                name="New Sub Task"
                isCreateSubTask={true}
                parentTaskId={task._id}
              />
            </div>
            {isLeader && (
              <div className="MemberManagement">
                <MemberManagement
                  token={token}
                  taskId={task._id}
                  createdBy={task.createdBy}
                  userId={id}
                />
              </div>
            )}
          </div>

          <div style={{ padding: "20px" }}>
            <Tabs items={items} />
          </div>
        </div>
        <div className="Container__secondBox">
          <TimeLine />
        </div>
      </div>
    </>
  );
};

export default TaskDetail;
