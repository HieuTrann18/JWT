import React from "react";
import styles from "./style.module.scss";
const Button = ({ content, type = "submit" }) => {
  return (
    <button type={type} className={styles.btn}>
      {content}
    </button>
  );
};

export default Button;
