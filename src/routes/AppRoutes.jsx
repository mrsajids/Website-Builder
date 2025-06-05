import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login.jsx";
import MyProjects from "../pages/project/MyProjects.jsx";
import StudioCemponent from "../pages/editor/StudioComponent.jsx";
import Landing from "../pages/Landing.jsx";
import PublicLayout from "../layouts/AuthLayout.jsx";
import { AuthContextProvider } from "../context/authContext.js";
import Testing from "../Tesing.jsx";
import { SidebarProvider } from "../context/sidebarContext.js";
import TemplateGallery from "../pages/templates/Templates.jsx";
import TemplatePreview from "../pages/templates/TemplatePreview.jsx";
import UserProfile from "../pages/user/UserProfile.jsx";

const AppRoutes = () => (
  <AuthContextProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>

        {/* <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} /> */}
        <Route
          element={
            <SidebarProvider>
              <MainLayout />
            </SidebarProvider>
          }
        >
          {/* <Route path="/" element={<Navigate to="/projects" replace />} /> */}
          <Route path="/projects" element={<MyProjects />} />
          <Route path="/templates" element={<TemplateGallery />} />
          <Route path="/preview/:id" element={<TemplatePreview />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/myprofile" element={<UserProfile />} />
        </Route>
        <Route path="/editor/:projectid" element={<StudioCemponent />} />
      </Routes>
    </Router>
  </AuthContextProvider>
);

export default AppRoutes;
