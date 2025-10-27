import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./style.module.scss";

import { navItems } from "../Sidebar/constant";
const Navbar = () => {
  const location = useLocation();
  const currentItem = navItems.find((i) => i.href === location.pathname);
  return (
    <div className={styles.navbar_container}>
      <h1>{currentItem ? currentItem.content : "Trang chủ"}</h1>

      <span>Xin chào, Admin</span>
    </div>
  );
};

export default Navbar;
