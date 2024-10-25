import { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { get } from "../../utils/request";
import { getCookie } from "../../helpers/cookie";
import { IoIosNotificationsOutline } from "react-icons/io";
import "./style.scss";

function Home() {
  const token = getCookie("tokenUser");
  const [data, setData] = useState([]);
  const config = {
    data: data,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Tasks\nAnalysis",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: "100%",
          fontStyle: "bold",
        },
      },
    ],
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await get(token, "task/statistic/status");
      setData(result.map((item) => ({ type: item.status, value: item.value })));
    };
    fetchApi();
  }, []);

  return (
    <>
      <div className="container__home">
        <div className="container__home__box1">
          {data.length > 0 ? (
            <Pie {...config} className="chart" />
          ) : (
            <div>Loading....</div>
          )}
        </div>
        <div className="container__home__box2">
          <div className="container__home__box2__title">
            <IoIosNotificationsOutline style={{ fontSize: "2rem" }} />{" "}
            Notification
          </div>
          <div className="container__home__box2__under">
            This is a notification message!
          </div>
          <div className="container__home__box2__under">
            Please check your email for further instructions.
          </div>
          <div className="container__home__box2__under">
            Your request has been submitted successfully.
          </div>
          <div className="container__home__box2__under">
            An error occurred. Please try again later.
          </div>
          <div className="container__home__box2__under">
            Your session has expired. Please log in again.
          </div>
          <div className="container__home__box2__under">
            A notification has been added to this task.
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
