import React, { useContext, useState } from "react";
import styles from "./style.module.scss";
import { PiStudentFill } from "react-icons/pi";
import { navItems } from "./constant";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className={styles.sidebar}>
      <div className={styles.head_sidebar}>
        <PiStudentFill />
        <h2>Quản lý sinh viên</h2>
      </div>
      <div className={styles.sidebar_options}>
        {navItems.map((i, idx) => {
          const Icon = i.icon;
          return (
            <Link key={idx} to={i.href} className={styles.option_item}>
              <Icon />
              <span>{i.content}</span>
            </Link>
          );
        })}

        <div className={styles.option_item}>
          <IoIosLogOut />
          <span>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
