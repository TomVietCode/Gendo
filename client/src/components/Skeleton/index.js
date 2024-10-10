import React from "react";
import { Skeleton } from "antd";
import "./style.scss";

export const LoadingSkeleton = () => {
  return (
    <Skeleton
      style={{ marginTop: "20px" }} 
      loading={true}
      title={false}
      active={true}
      paragraph={{
        rows: 8,
        width: ["100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%"]
      }}
    />
  );
};

export const loadingTasksDetail = () => (
  <div className="Container__firstBox">
    <div className="box1">
      <Skeleton.Input style={{ width: 100 }} active={true} size="small" />
      <Skeleton.Input style={{ width: 100 }} active={true} size="small" />
    </div>

    <div className="box2">
      <Skeleton.Input style={{ width: 50 }} active={true} size="small" />
      <Skeleton paragraph={{ rows: 3, width: "100%" }} active={true} />
    </div>

    <div className="box3">
      <Skeleton.Input style={{ width: 100 }} active={true} size="small" />
      <Skeleton.Input style={{ width: 100 }} active={true} size="small" />
    </div>
  </div>
);

