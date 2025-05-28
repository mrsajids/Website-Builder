import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login.jsx";
import MyProjects from "../pages/MyProjects.jsx";
import StudioCemponent from "../MyComponent.jsx";
import Landing from "../pages/Landing.jsx";
import PublicLayout from "../layouts/AuthLayout.jsx";
import { AuthContextProvider } from "../context/authContext.js";

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
        <Route element={<MainLayout />}>
          {/* <Route path="/" element={<Navigate to="/projects" replace />} /> */}
          <Route path="/projects" element={<MyProjects />} />
        </Route>
        <Route path="/editor/:projectid" element={<StudioCemponent />} />
      </Routes>
    </Router>
  </AuthContextProvider>
);

export default AppRoutes;
