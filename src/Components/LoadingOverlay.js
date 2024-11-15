import React, { useEffect, useState } from 'react';
import styles from '../Css/LoadingOverlay.module.css';

const LoadingOverlay = ({ show }) => {
	const [isFadingOut, setIsFadingOut] = useState(false);
	const [text, setText] = useState('');

	const textArray = [
		'너무 춥다..',
		'너무 무섭다..',
		'기분이 이상하다..',
		'이상한 일이 일어났어..',
		'뭐가 있을까..',
		'정말 놀랐다..',
		'우리는 어디로 가야 할까..',
	];

	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * 7);
		setText(textArray[randomNumber]);
		if (show) {
			setIsFadingOut(false); // 모달이 열릴 때 fade-out 상태 초기화
		} else {
			setIsFadingOut(true); // 모달이 닫힐 때 fade-out 시작

			// 1초 후에 fade-out을 초기화하여 컴포넌트를 완전히 숨김
			const timer = setTimeout(() => {
				setIsFadingOut(false);
			}, 1000); // fade-out 애니메이션 시간과 일치

			return () => clearTimeout(timer); // 타이머 정리
		}
	}, [show]);

	return (
		<div
			className={`${styles.overlay} ${
				isFadingOut ? styles.overlay_fade_out : ''
			}`}
		>
			<div className={styles.text_container}>
				<h1>{text}</h1>
			</div>
			<div className={styles.image_container}>
				{[
					'frog.png',
					'crocodile.png',
					'lizard.png',
					'tucan.png',
					'jaguar.png',
				].map((src, index) => (
					<img
						key={index}
						src={src}
						alt={`animal-${index}`}
						className={`${styles.animal_image} ${styles[`wave_${index}`]}`}
					/>
				))}
			</div>
		</div>
	);
};

export default LoadingOverlay;
