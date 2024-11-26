import React, { useEffect, useState } from 'react';
import styles from '../Css/LoadingOverlay.module.css';

const LoadingOverlay = ({ fadingOut, text }) => {
	const [index, setIndex] = useState(0);
	const [isTextFadingOut, setIsTextFadingOut] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsTextFadingOut(true);
			setTimeout(() => {
				setIndex((index) => (index + 1) % text.length);
				setIsTextFadingOut(false);
			}, 500); // 텍스트가 바뀔 때의 fade-out 시간
		}, 3500);

		return () => clearInterval(interval);
	}, [text]);

	return (
		<div
			className={`${styles.overlay} ${
				fadingOut ? styles.overlay_fade_out : ''
			}`}
		>
			<div
				className={`${styles.text_container} ${
					isTextFadingOut ? styles.fade_out : styles.fade_in
				}`}
			>
				{fadingOut ? '' : <h1>{text[index]}</h1>}
			</div>
		</div>
	);
};

export default LoadingOverlay;
