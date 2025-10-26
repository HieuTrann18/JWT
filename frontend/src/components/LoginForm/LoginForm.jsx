import React from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const handleChangeForm = () => {
    navigate("/register");
  };
  return (
    <div className={styles.container_form}>
      <h2 className="text-center">Đăng nhập</h2>
      <input type="text" placeholder="Nhập email của bạn..." />
      <input type="password" placeholder="Mật khẩu..." />
      <button>Login</button>
      <div className="d-flex gap-4 justify-content-center">
        <span className={styles.options}>Quên mật khẩu?</span>
        <span>|</span>
        <span className={styles.options} onClick={handleChangeForm}>
          Đăng ký ngay
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
