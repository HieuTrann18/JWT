// routers/routers.js
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Admin/Dashboard";

const routers = [
  {
    path: "/",
    component: Home,
    private: false,
  },
  {
    path: "/login",
    component: Login,
    private: false,
  },
  {
    path: "/admin/dashboard",
    component: Dashboard,
    private: true,
  },
];

export default routers;
