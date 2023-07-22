import React from "react";
import styles from './Button.module.css';

export default function Button({ text, isActive, clickHandler }) {
  const className = isActive ? styles.btn : styles['btn--disabled'];

  return (
    <button
      disabled={!isActive}
      className={className}
      onClick={clickHandler}>
      {text}
    </button>
  )
}