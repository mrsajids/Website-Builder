import { Menu, Layout } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  ProjectFilled,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import React from "react";
import { useSidebar } from "../context/sidebarContext";
import { MdSpaceDashboard } from "react-icons/md";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = React.useContext(AuthContext);
  const { collapsed, toggleCollapsed } = useSidebar();

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
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      width={250}
      collapsedWidth={80}
      className="sidebar-sider"
      style={{
        position: "fixed",
        left: 0,
        top: 70,
        bottom: 0,
        zIndex: 1,
        height: "100vh",
      }}
    >
      <div className={"workspace-section" + (collapsed ? " d-flex" : "")}>
        <img
          src="assets/images/logo/workspace.png"
          className="workspace-image"
          alt=""
        />
        {collapsed ? null : (
          <>
            <span className="fw-bold">{`${currentUser.name}'s`}</span>Workspace
          </>
        )}
      </div>
      <Menu
        className="sidebar-menu"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleClick}
        items={[
          // { key: "/", icon: <DashboardOutlined />, label: "Dashboard" },
          { key: "/projects", icon: <ProjectFilled />, label: "My Projects" },
          { key: "/templates", icon: <MdSpaceDashboard />, label: "Templates" },
          { key: "/myprofile", icon: <UserOutlined />, label: "My Profile" },
          { key: "logout", icon: <LogoutOutlined />, label: "Logout" },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
