import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./style.module.scss";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
