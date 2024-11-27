import React from 'react';
import styles from '../Css/Tooltip.module.css';

export default function Tooltip({ message, position, style }) {
  return (
    <div className={`${styles.tooltip} ${styles[position]}`} style={style}>
      {message}
    </div>
  );
}
