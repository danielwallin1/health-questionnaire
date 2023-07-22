import React from "react";
import styles from './Radio.module.css';

export default function Radio({ id, value, handleSelection, checked }) {
  return (
    <input
      className={styles.radio}
      id={id}
      name={id}
      value={value}
      type="radio"
      checked={checked}
      onChange={event => handleSelection(event.target.id, value)}
    />
  )
}