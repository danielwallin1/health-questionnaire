import React from "react";
import styles from './Label.module.css';

export default function Label({ value, text }) {
  return (
      <label className={styles.label} htmlFor={value}>{text}</label>
    )
}