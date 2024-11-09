import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import { useNavigate } from 'react-router-dom';
import styles from '../Css/Wait.module.css';

const Wait = () => {
	const navigate = useNavigate();
	const [bIsUploadingSucess, setBIsUploadingSucess] = useState(0);

	useEffect(() => {
		// Phaser 게임 설정
		const config = {
			type: Phaser.AUTO,
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x000000, // 배경을 검정색으로 설정
			scene: {
				preload: preload,
				create: create,
			},
		};

		// Phaser 게임 인스턴스 생성
		const game = new Phaser.Game(config);

		function preload() {
			this.load.audio('backgroundMusic', 'Sounds/jungle-background.mp3');
		}

		function create() {
			// 배경 음악 재생
			this.sound.play('backgroundMusic', {
				loop: true, // 반복 재생
				volume: 0.5, // 볼륨 조절 (0에서 1 사이)
			});

			// 텍스트를 나눠서 애니메이션 만들기
			const textContent = '대기 중...';
			const text = this.add.text(
				this.cameras.main.centerX,
				this.cameras.main.centerY,
				'',
				{
					font: '36px Arial',
					fill: '#FFFFFF',
					align: 'center',
				}
			);

			text.setOrigin(0.5, 0.5);

			// 텍스트 한 글자씩 표시하는 애니메이션 만들기
			let i = 0;
			const interval = setInterval(() => {
				if (i < textContent.length) {
					text.setText(textContent.substring(0, i + 1));
					i++;
				} else {
					clearInterval(interval);
				}
			}, 500);

			// 글자 크기 애니메이션 효과
			this.tweens.add({
				targets: text,
				scaleX: 1.2,
				scaleY: 1.2,
				duration: 1000,
				yoyo: true,
				repeat: -1,
			});
		}

		// 업로드 상태 확인
		const checkUploadSuccess = setInterval(() => {
			if (bIsUploadingSucess === 1) {
				// 업로드 성공 시 음악 멈추고 페이지 이동
				game.sound.stopAll(); // 모든 음악을 멈춤
				game.destroy(true); // Phaser 게임 인스턴스를 완전히 종료
				navigate('/game'); // /game 페이지로 이동
				clearInterval(checkUploadSuccess); // 반복문 종료
			}
		}, 500);

		// 컴포넌트 언마운트 시 정리
		return () => {
			clearInterval(checkUploadSuccess); // 인터벌 제거
			//game.sound.stopAll();  // 컴포넌트 언마운트 시 음악 정지
			game.destroy(true); // 게임 인스턴스 종료
		};
	}, [bIsUploadingSucess, navigate]);

	// 10초 후 업로드 성공 상태 변경 (예시)
	useEffect(() => {
		const timer = setTimeout(() => {
			setBIsUploadingSucess(1); // 업로드 성공 상태 변경
		}, 10000); // 10초 후 상태 변경 (예시)

		return () => clearTimeout(timer); // 타이머 클린업
	}, []);

	return <div id="game-container" className={styles.gameContainer}></div>;
};

export default Wait;
