import { Menu, Layout } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import React from "react";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = React.useContext(AuthContext);

  const handleClick = ({ key }) => {
    if (key === "logout") {
      // logout logic
    } else {
      navigate(key);
    }
  };

  return (
    <Sider
      collapsible
      width={250}
      collapsedWidth={80}
      className="sidebar-sider"
    >
      <div className="workspace-section">
        <img
          src="assets/images/logo/workspace.png"
          className="workspace-image"
          alt=""
        />
        <span className="fw-bold">{`${currentUser.name}'s`}</span>Workspace
      </div>
      <Menu
        className="sidebar-menu"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleClick}
        items={[
          // { key: "/", icon: <DashboardOutlined />, label: "Dashboard" },
          { key: "/projects", icon: <UserOutlined />, label: "My Projects" },
          { key: "logout", icon: <LogoutOutlined />, label: "Logout" },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
