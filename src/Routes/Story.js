import React, { useState } from 'react';
import styles from '../Css/Story.module.css';
import { useNavigate } from 'react-router-dom';
import Contract from '../Components/Contract';

function Story() {
	const [modal, setModal] = useState(false); // 모달 상태
	const [modalComplete, setModalComplete] = useState(false); // 모달 완료 상태
	const navigate = useNavigate();

	// 이미지 배열
	const images = [
		'0.png',
		'1.png',
		'2.png',
		'3.png',
		'4.png',
		'5.png',
		'6.png',
		'7.png',
		'8.png',
		'9.png',
		'10.png',
	];

	// 현재 이미지 인덱스
	const [currentIndex, setCurrentIndex] = useState(0);
	const [fadeState, setFadeState] = useState(false); // 페이드 애니메이션 상태

	// 모달 완료 상태 업데이트 함수
	const handleContractComplete = (e) => {
		setModal(false); // 모달 닫기
		setModalComplete(true); // 모달 완료 상태로 설정
		e.stopPropagation();
	};

	// 클릭 이벤트 처리 함수
	const handleClick = async (event) => {
		const clickX = event.clientX;
		const screenWidth = window.innerWidth;

		if (clickX < screenWidth / 2) {
			// 왼쪽 클릭 (이전 페이지로 이동)
			if (currentIndex > 0) {
				setFadeState(true);
				setTimeout(() => {
					setCurrentIndex(currentIndex - 1);
					setFadeState(false);
				}, 300);
			}
		} else {
			// 오른쪽 클릭 (다음 페이지로 진행)
			if (currentIndex < images.length - 1) {
				// 2번째 페이지에서만 Contract 모달이 뜨도록
				if (currentIndex === 2 && !modalComplete) {
					setModal(true); // 모달 열기
					return; // 모달이 닫히기 전까지 진행하지 않음
				}
				setModalComplete(false);
				// 모달 완료 후 다음 슬라이드로 진행
				setFadeState(true);
				setTimeout(() => {
					setCurrentIndex(currentIndex + 1);
					setFadeState(false);
				}, 300);
			} else {
				// 마지막 페이지면 /dodge로 이동
				navigate('/dodgetutorial');
			}
		}
	};

	return (
		<div className={styles.container} onClick={handleClick}>
			<div className={styles.imageWrapper}>
				{/* 이미지와 페이드 효과 */}
				<img
					src={images[currentIndex]}
					alt={`Page ${currentIndex + 1}`}
					className={`${styles.image} ${
						fadeState ? styles.fadeOut : styles.fadeIn
					}`}
				/>
			</div>

			{/* 모달과 오버레이 */}
			{modal && (
				<>
					<div className={styles.overlay}> </div>
					<div className={`${styles.modal} ${modal ? styles.show : ''}`}>
						{/* Contract 컴포넌트 */}
						<Contract onComplete={handleContractComplete} />
					</div>
				</>
			)}
		</div>
	);
}

export default Story;
