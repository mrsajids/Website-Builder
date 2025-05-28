import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FooterBar from "../components/FooterBar";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import "../assets/css/layout.css";

const { Content } = Layout;

const MainLayout = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }


  return (
    <>
      <Navbar />
      <Layout className="outer-layout">
        <Sidebar />
        <Layout className="inner-layout">
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
