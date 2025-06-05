import { Button } from "antd";
import React from "react";
import video from "../assets/gif/noDataFound.mp4";

const NoDataFound = ({ message }) => {
  return (
    <div className="text-center p-4">
      <video
        src={video}
        alt="No Data Found"
        style={{ width: "100px", height: "100px" }}
        autoPlay
        loop
        className="mb-2"
      />
      <h3>No Projects Found</h3>
      <p>Create your first project to get started!</p>
      {/* <Button
        type="primary"
        onClick={() => showModal()}
        icon={<PlusOutlined />}
      >
        New Project
      </Button> */}
    </div>
  );
};

export default NoDataFound;
