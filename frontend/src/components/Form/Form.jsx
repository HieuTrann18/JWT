import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import Title from "../Title/Title";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { signIn } from "../../apis/authClient";
import { AuthContext } from "../../context/AuthProvider";
const Form = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);

  const [error, setError] = useState("");
  const [account, setAccount] = useState({
    email: "",
    password: "",
    cfmpassword: "",
    fullName: "",
  });

  const handleChangeToRegister = () => {
    setIsRegister(!isRegister);
    setError("");
    setAccount({ email: "", password: "" });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("handleOnSubmit called");
    if (!account.email.trim() || !account.password.trim()) {
      setError("Email và password không được để trống");
      return;
    }
    try {
      const res = await signIn({
        email: account.email,
        password: account.password,
      });
      const { user, accessToken, refreshToken } = res.data;
      login(accessToken, refreshToken, user);
      setError("");
      const role = user.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "student") {
        navigate("/");
      }
    } catch (err) {
      const messageErr = err.response?.data?.error || "Login thất bại";
      setError(messageErr);
      console.log("check err", err);
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form__common}
        onSubmit={handleOnSubmit}
        noValidate
      >
        <Title content={isRegister ? "Sign up" : "Sign in"} />
        {isRegister && (
          <Input
            placeholder={"Full name"}
            name="fullName"
            value={account.fullName}
            onChange={handleOnChange}
          />
        )}
        <Input
          placeholder={"Email"}
          name="email"
          value={account.email}
          onChange={handleOnChange}
        />
        <Input
          type="password"
          placeholder={"Password"}
          name="password"
          value={account.password}
          onChange={handleOnChange}
        />

        {isRegister && (
          <Input
            type="password"
            placeholder={"Confirm password"}
            name="cfmpassword"
            value={account.cfmpassword}
            onChange={handleOnChange}
          />
        )}
        {error && <div className={styles.errorText}>{error}</div>}
        <Button content={isRegister ? "Sign up" : "Login"} type="submit" />
        <div className={styles.option__helper}>
          <span onClick={handleChangeToRegister}>
            {isRegister ? "Already have an account?" : "Register now"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default Form;
