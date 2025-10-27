import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Student from "./pages/Admin/Student/Student";
import Report from "./pages/Admin/Report/Report";
import Setting from "./pages/Admin/Setting/Setting";
import Layout from "./pages/Admin/Layout";
import LayoutStudent from "./pages/HomePage/LayoutStudent";
import Error from "./pages/Error/Error";
import { AuthProvider } from "./context/AuthProvider";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Admin route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoutes requiredRole="admin">
                <Layout />
              </ProtectedRoutes>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Student />} />
            <Route path="report" element={<Report />} />
            <Route path="setting" element={<Setting />} />
          </Route>
          {/* Admin route */}
          {/* Student route */}
          <Route
            path="/student"
            element={
              <ProtectedRoutes requiredRole="student">
                <LayoutStudent />
              </ProtectedRoutes>
            }
          >
            <Route path="" element={<HomePage />} />
          </Route>
          <Route path="/error" element={<Error />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
