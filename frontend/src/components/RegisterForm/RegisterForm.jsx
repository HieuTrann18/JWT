import React from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const navigate = useNavigate();
  const handleChangeForm = () => {
    navigate("/");
  };
  return (
    <div className={styles.container_form}>
      <h2 className="text-center">Đăng ký</h2>
      <div className="d-flex gap-2">
        <input type="text" placeholder="Họ và tên" />
        <input type="text" placeholder="Nhập email của bạn" />
      </div>
      <div className="d-flex gap-2">
        <input
          style={{ width: "40%" }}
          type="text"
          placeholder="Mã sinh viên"
        />
        <input type="text" placeholder="Ngành học" />
      </div>

      <input type="password" placeholder="Mật khẩu" />
      <input type="password" placeholder="Nhập lại mật khẩu" />

      <button>Login</button>
      <span className={styles.options} onClick={handleChangeForm}>
        Bạn đã có tài khoản?
      </span>
    </div>
  );
};

export default RegisterForm;
