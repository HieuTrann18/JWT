import React from "react";
import styles from "./style.module.scss";
import { PiStudentFill } from "react-icons/pi";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.head_sidebar}>
        <PiStudentFill />
        <h2>Quản lý sinh viên</h2>
      </div>
      <div className={styles.sidebar_options}>
        <div className={styles.option_item}>
          <CiUser />
          <span>Trang chủ</span>
        </div>
        <div className={styles.option_item}>
          <HiOutlineDocumentReport />
          <span>Sinh viên</span>
        </div>
        <div className={styles.option_item}>
          <IoSettingsOutline />
          <span>Báo cáo</span>
        </div>
        <div className={styles.option_item}>
          <AiOutlineDashboard />
          <span>Cài đặt</span>
        </div>
        <div className={styles.option_item}>
          <IoIosLogOut />
          <span>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
