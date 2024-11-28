import React, { useEffect, useState } from 'react';
import styles from '../Css/StatusModal.module.css';
import { useNavigate } from 'react-router-dom';

export default function StatusModal({
	statFadingOut,
	onClose,
	difWater,
	difFood,
	difHp,
	damage,
	day,
	prob,
	alive,
	causeOfDeath,
	imageUrl,
}) {
	const [isTextFadingOut, setIsTextFadingOut] = useState(false);
	const [currentStep, setCurrentStep] = useState(damage ? 0 : 1); // 데미지가 없으면 1번부터 시작

	const navigate = useNavigate();

	useEffect(() => {
		let stepInterval;

		// 모달이 페이드아웃 중이라면
		if (statFadingOut) {
			setIsTextFadingOut(true);
			setTimeout(() => {
				onClose();
			}, 3000); // Fade-out 이후 모달 종료
			return;
		}

		// 현재 단계별 처리
		if (currentStep <= 2) {
			// 각 단계 4초 유지
			stepInterval = setTimeout(() => {
				setIsTextFadingOut(true);
				setTimeout(() => {
					setIsTextFadingOut(false);
					setCurrentStep((prev) => prev + 1); // 다음 단계로 전환
				}, 500); // fade-out 시간
			}, 4000);
		}

		// 모든 단계가 끝나면 종료
		if (currentStep > 2) {
			clearTimeout(stepInterval);
			setTimeout(() => onClose(), 1000); // 모달 자동 종료
		}

		// 정리 작업
		return () => clearTimeout(stepInterval);
	}, [statFadingOut, currentStep]);

	const renderContent = () => {
		if (damage && currentStep === 0) {
			// 데미지 알림 단계
			return (
				<div className={styles.damageEffect}>
					<h1 className={styles.text}>
						당신은 부상을 입었습니다. <br /> 오늘 밤 당신이 사망할 확률은{' '}
						<span className={styles.prob}>{damage * 10 + prob}%</span>입니다.
					</h1>
				</div>
			);
		} else if (currentStep === 1) {
			// 생존 여부 알림 단계
			if (!alive) {
				navigate('/endstory', {
					state: { causeOfDeath: causeOfDeath, imageUrl: imageUrl },
				});
			} else {
				return (
					<h1 className={styles.text}>
						당신은 오늘도 무사히 살아남았습니다.<br></br>Day : {day}
					</h1>
				);
			}
		} else if (currentStep === 2) {
			// 자원 변화 표시 단계
			return (
				<div>
					<h1 className={styles.text}>
						<img className={styles.img} src="water.png"></img>{' '}
						{difWater >= 0 ? '+' : ''} {difWater}
					</h1>
					<h1 className={styles.text}>
						<img className={styles.img} src="food.png"></img>
						{difFood >= 0 ? '+' : ''} {difFood}
					</h1>
					<h1 className={styles.text}>
						<img className={styles.img} src="UI/heart.png"></img>
						{difHp >= 0 ? '+' : ''} {difHp}
					</h1>
				</div>
			);
		} else {
			return null;
		}
	};

	return (
		<div
			className={`${styles.overlay} ${
				statFadingOut ? styles.overlay_fade_out : ''
			}`}
		>
			<div
				className={`${styles.text_container} ${
					isTextFadingOut ? styles.fade_out : styles.fade_in
				}`}
			>
				{renderContent()}
			</div>
		</div>
	);
}
