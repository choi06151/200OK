import { useNavigate } from 'react-router-dom';
import mainstyle from '../App.module.css';
import styles from '../Css/Game.module.css';
import { useEffect, useState } from 'react';

function Game() {
	const navigate = useNavigate();

	let [choice, setChoice] = useState(1);

	useEffect(() => {
		console.log(choice);
	}, [choice]);

	return (
		<div className={mainstyle.div}>
			<div className={styles.imgdiv}>
				{' '}
				이미지 영역
				<img alt="img"></img>
			</div>
			<div className={styles.textdiv}>
				하루 종일 정글을 헤매다 겨우 바나나 몇 개를 찾았다. 나무 아래에 몸을
				기대고, 잠시 숨을 고르며 이 밤을 어떻게 보낼지 생각했다.
			</div>

			{/* 선택지 영역 */}
			<div className={styles.choiceContainer}>
				<div
					className={styles.choice}
					onClick={() => {
						setChoice(1);
					}}
				>
					<input type="radio" id="choice1" name="choices" defaultChecked />
					<label htmlFor="choice1">선택지 1: 가까운 강에서 물을 찾는다</label>
				</div>
				<div
					className={styles.choice}
					onClick={() => {
						setChoice(2);
					}}
				>
					<input type="radio" id="choice2" name="choices" />
					<label htmlFor="choice2">
						선택지 2: 주변에 먹을 만한 과일을 찾아본다
					</label>
				</div>
				<div
					className={styles.choice}
					onClick={() => {
						setChoice(3);
					}}
				>
					<input type="radio" id="choice3" name="choices" />
					<label htmlFor="choice3">선택지 3: 쉬면서 체력을 회복한다</label>
				</div>
			</div>

			<div className={styles.userdiv}>
				<div className={styles.statusdiv}>
					<img src="/water.png" alt="Water" className={styles.statusImage} />
					물: 5
					<img src="/food.png" alt="Food" className={styles.statusImage} />
					<p>식량: 3</p>
				</div>
				<div className={styles.choicediv}>
					<button
						className={`${styles.submitButton}`}
						onClick={() => {
							// 서버 전송 로직 작성
							console.log('선택지를 서버에 전송합니다.');
						}}
					>
						선택
					</button>
					<button
						className={styles.submitButton}
						onClick={() => {
							navigate('/end');
						}}
					>
						엔딩보기
					</button>
				</div>
			</div>
		</div>
	);
}

export default Game;
