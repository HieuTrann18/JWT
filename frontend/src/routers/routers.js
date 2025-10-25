import { lazy } from "react";
const routers = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home/Home")),
    private: false,
  },

  {
    path: "/login",
    component: lazy(() => import("../pages/Login/Login")),
    private: false,
  },

  {
    path: "/admin/dashboard",
    component: lazy(() => import("../pages/Admin/Dashboard")),
    private: true,
  },
];

export default routers;
