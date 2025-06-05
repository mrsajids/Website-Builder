import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FooterBar from "../components/FooterBar";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import "../assets/css/layout.css";
import { useSidebar } from "../context/sidebarContext";

const { Content } = Layout;

const MainLayout = () => {
  const { currentUser } = useContext(AuthContext);
  const { collapsed } = useSidebar();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }


  return (
    <>
      <Navbar />
      <Layout className="outer-layout" hasSider>
        <Sidebar />
        <Layout className="inner-layout" style={{ marginLeft: collapsed ? 90 : 260 }}>
          <Content>
            <Outlet />
          </Content>
          <FooterBar />
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
