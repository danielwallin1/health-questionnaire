import React from "react";
import styles from './Heading.module.css';

export default function Heading({ text, size, weight }) {
  return (
    <h1 className={styles.heading} style={{ fontSize: size, fontWeight: weight }}>{text}</h1>
  )
}