import React, { useState } from "react";
import styles from "./style.module.scss";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
const Input = ({ placeholder = "", type = "text", name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isShowTextOrPassword =
    type === "password" && showPassword ? "text" : type;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.boxInput}>
        <input
          className={styles.input__common}
          type={isShowTextOrPassword}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        />
        {isPassword && (
          <div className={styles.iconsIsShow} onClick={handleShowPassword}>
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
