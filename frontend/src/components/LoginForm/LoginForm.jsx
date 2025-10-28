import React, { useContext, useState } from "react";
import styles from "./style.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const isPassword = "password";
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const isShowTextOrPassword = showPassword ? "text" : "password";
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeForm = (path) => {
    navigate(path);
  };
  const isLogin = location.pathname === "/";
  const isRegister = location.pathname === "/register";
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(account.email, account.password);
      console.log("checkres", res.data.user);
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
      setError("");
    } catch (error) {
      const errMsg = error.response?.data?.error;
      setError(errMsg);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.box_auth}>
        <button className={isLogin ? styles.active : ""}>Đăng nhập</button>
        <button
          className={isRegister ? styles.active : ""}
          onClick={() => handleChangeForm("/register")}
        >
          Đăng ký
        </button>
      </div>
      <form onSubmit={handleOnSubmit} className={styles.container_form}>
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
          <span style={{ fontSize: "12px" }}>Ghi nhớ đăng nhập</span>

          {error && (
            <div style={{ fontSize: "13px", color: "red" }}>{error}</div>
          )}
        </div>

        <button>Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginForm;
