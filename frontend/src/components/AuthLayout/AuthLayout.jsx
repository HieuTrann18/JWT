import React from "react";
import styles from "./style.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const AuthLayout = ({ children }) => {
  return (
    <>
      <div className={styles.auth__layout}>{children}</div>
      <div className={styles.overlay}></div>
    </>
  );
};

export default AuthLayout;
