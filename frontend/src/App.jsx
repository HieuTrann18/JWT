import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Student from "./pages/Admin/Student/Student";
import Report from "./pages/Admin/Report/Report";
import Setting from "./pages/Admin/Setting/Setting";
import {AuthProvider} from "./context/AuthProvider"
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Student />} />
          <Route path="report" element={<Report />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
