import React from "react";
import styles from "./style.module.scss";
const Title = ({ content, level = "1" }) => {
  const Tag = `h${level}`;
  return <Tag className={styles.title}>{content}</Tag>;
};

export default Title;
