import React from "react";
import { Outlet } from "react-router-dom";
const LayoutStudent = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LayoutStudent;
