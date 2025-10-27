import React, {useContext, useState} from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
const LoginForm = () => {
  const {login} = useContext(AuthContext)
  const navigate = useNavigate();
  const handleChangeForm = () => {
    navigate("/register");
  };
  const [account, setAccount] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setAccount((prev) => ({
      ...prev, [name]: value
    }))
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try{
        await login(account.email,account.password)
    }catch(err){
      console.log("check error", err)
    }
  }
  return (
      <form onSubmit={handleOnSubmit} className={styles.container_form}>
          <h2 className="text-center">Đăng nhập</h2>
          <input type="email" placeholder="Nhập email của bạn" name="email" value={account.email} onChange={handleOnChange} />
          <input type="password" placeholder="Mật khẩu" name="password" value={account.password} onChange={handleOnChange} />
          <button>Login</button>
          <div className="d-flex gap-4 justify-content-center">
            <span className={styles.options}>Quên mật khẩu?</span>
            <span>|</span>
            <span className={styles.options} onClick={handleChangeForm}>
              Đăng ký ngay
            </span>
          </div>
      </form>
  );
};

export default LoginForm;
