import React from "react";
import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FooterBar from "../components/FooterBar";
import TopBar from "../components/TopBar";
import { AuthContext } from "../context/authContext";

const { Content } = Layout;

const AuthLayout = () => {
    const { currentUser } = React.useContext(AuthContext);
  
    if (currentUser) {
      return <Navigate to="/projects" replace />;
    }
  return (
    <>
      <TopBar />
      <Layout>
        <Content>
          <Outlet />
        </Content>
        <FooterBar />
      </Layout>
    </>
  );
};

export default AuthLayout;
