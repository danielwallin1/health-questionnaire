import React from "react";
import Radio from '../../atoms/Radio/Radio';
import Label from '../../atoms/Label/Label';
import styles from './RadioWithLabel.module.css';

export default function RadioWithLabel({ id, value, text, checked, handleSelection }) {
  const className = checked !== id ? 'radio-with-label' : 'radio-with-label--active';

  return (
    <div className={styles[className]}>
    <Label
      value={id}
      text={text}
    />
    <Radio
      id={id}
      value={value}
      checked={checked==id}
      handleSelection={handleSelection}
    />
    </div>
  )
}