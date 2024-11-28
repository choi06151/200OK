import React, { useState, useEffect } from 'react';
import styles from '../Css/EndingStory.module.css';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { getUser } from '../service/service';
import { useSelector } from 'react-redux';

export default function EndingStory() {
	const [currentLine, setCurrentLine] = useState(0); // 현재 표시할 텍스트 줄 번호
	const [fadeClass, setFadeClass] = useState(styles.fadeIn); // 초기 애니메이션 클래스 설정
	const [showHint, setShowHint] = useState(true); // 힌트 표시 여부
	const [hintTimeout, setHintTimeout] = useState(null); // 힌트 타이머 관리
	const navigate = useNavigate();

	const [day, setDay] = useState();
	const { water, food } = useSelector((state) => state.status);
	const [url, setUrl] = useState();
	const { state } = useLocation();

	useEffect(() => {
		const id = sessionStorage.getItem('userId');
		getUser(id).then((response) => {
			setDay(response.data.day);
		});
	}, []);

	useEffect(() => {
		if (state) {
			setUrl(state.imageUrl);
		}
	}, [state]);

	const textLines = [
		'당신은 열심히 발버둥 쳐보았지만 결국 사망에 이르렀습니다..',
		`사망 사유 : ${state.causeOfDeath}`,
		`당신은 ${day}일 동안 생존하였으며,`,
		`그동안 ${water}병의 물을 마시고 ${food}개의 음식을 먹었습니다.`,
		`Game Over.`,
	]; // 텍스트 줄

	const handleClick = () => {
		if (currentLine < textLines.length) {
			// 다음 줄 표시
			setCurrentLine((prev) => prev + 1);
		} else {
			// 페이드아웃 효과 적용
			setFadeClass(styles.fadeOut);
			setTimeout(() => {
				navigate('/end'); // 애니메이션이 끝난 뒤 이동
			}, 1000); // fade-out 애니메이션 지속시간
		}
	};

	// 마지막 텍스트까지 다 보았을 때 타이머 시작
	useEffect(() => {
		setShowHint(false);
		// 마지막 텍스트까지 도달하면 3초 후에 힌트 표시
		const timeout = setTimeout(() => {
			setShowHint(true); // 3초 뒤 힌트 표시
		}, 3000);
		setHintTimeout(timeout); // 타이머 저장
	}, [currentLine]); // currentLine이 바뀔 때마다 실행

	// 컴포넌트가 언마운트 될 때 타이머 정리
	useEffect(() => {
		return () => {
			if (hintTimeout) {
				clearTimeout(hintTimeout);
			}
		};
	}, [hintTimeout]);

	return (
		<div className={`${styles.container} ${fadeClass}`} onClick={handleClick}>
			{/* 중앙 이미지 */}
			<img
				src={state.imageUrl}
				alt="Ending Illustration"
				className={styles.image}
			/>

			{/* 텍스트 영역 */}
			<div className={styles.textArea}>
				{textLines.slice(0, currentLine + 1).map((line, index) => (
					<div key={index} className={styles.textLine}>
						{line}
					</div>
				))}
			</div>

			{/* 힌트 메시지 */}
			{showHint ? <div className={styles.hint}>클릭하여 계속...</div> : ''}
		</div>
	);
}
