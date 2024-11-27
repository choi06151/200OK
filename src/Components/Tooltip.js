import React from 'react';
import styles from '../Css/Tooltip.module.css';

export default function Tooltip({ message, position, style, visible }) {
	return (
		<div
			className={`${styles.tooltip} ${visible ? styles.tooltipVisible : ''} ${
				styles[position]
			}`}
			style={style}
		>
			{message}
		</div>
	);
}
