import React from "react";
import styles from "./style.module.scss";
import { PiStudentFill } from "react-icons/pi";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.head_sidebar}>
        <PiStudentFill />
        <h2>Quản lý sinh viên</h2>
      </div>
      <div className={styles.sidebar_options}>
        <Link to="/admin/dashboard" className={styles.option_item}>
          <CiUser />
          <span>Trang chủ</span>
        </Link>
        <Link to="/admin/students" className={styles.option_item}>
          <HiOutlineDocumentReport />
          <span>Sinh viên</span>
        </Link>
        <Link to="/admin/report" className={styles.option_item}>
          <IoSettingsOutline />
          <span>Báo cáo</span>
        </Link>
        <Link to="/admin/setting" className={styles.option_item}>
          <AiOutlineDashboard />
          <span>Cài đặt</span>
        </Link>
        <Link to="/logout" className={styles.option_item}>
          <IoIosLogOut />
          <span>Đăng xuất</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
