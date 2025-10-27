import React, { useState } from "react";
import styles from "./style.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleChangeForm = (path) => {
    navigate(path);
  };
  const isLogin = location.pathname === "/";
  const isRegister = location.pathname === "/register";
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = "password";
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const isShowTextOrPassword = showPassword ? "text" : "password";
  const [account, setAccount] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.box_auth}>
        <button
          className={isLogin ? styles.active : ""}
          onClick={() => handleChangeForm("/")}
        >
          Đăng nhập
        </button>
        <button className={isRegister ? styles.active : ""}>Đăng ký</button>
      </div>
      <form className={styles.container_form}>
        <div className={styles.groupInput}>
          <label htmlFor="">Họ và tên</label>
          <input
            type="text"
            placeholder="abc..."
            name="name"
            value={account.name}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.groupInput}>
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            name="email"
            value={account.email}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.groupInput}>
          <label htmlFor="">Mật khẩu</label>
          <input
            type={isShowTextOrPassword}
            placeholder="••••••••"
            name="password"
            value={account.password}
            onChange={handleOnChange}
          />
          {isPassword && (
            <div className={styles.pass_icon} onClick={handleShowPassword}>
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          )}
        </div>
        <div className={styles.remember}>
          <input type="checkbox" />
          <span
            style={{ fontSize: "12px" }}
            className="d-flex align-items-center gap-1"
          >
            <p>Tôi đồng ý</p>{" "}
            <p style={{ color: "red", cursor: "pointer" }}>
              Điều khoản dịch vụ
            </p>{" "}
            <p> và</p>
            <p style={{ color: "red", cursor: "pointer" }}>
              Chính sách bảo mật
            </p>
          </span>
        </div>
        <button>Tạo tài khoản</button>
      </form>
    </div>
  );
};

export default RegisterForm;
