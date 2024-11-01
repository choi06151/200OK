import React, { useState, useRef } from 'react';
import styles from '../Css/Contract.module.css'; // CSS 모듈 임포트
import { useNavigate } from 'react-router-dom';

const Contract = () => {
	const [name, setName] = useState('');
	const [gender, setGender] = useState('남');
	const canvasRef = useRef(null);
	const isDrawing = useRef(false);
	const lastX = useRef(0);
	const lastY = useRef(0);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// 계약서 제출 로직 추가 (예: 이름, 성별 처리)
		console.log(`이름: ${name}, 성별: ${gender}`);
	};

	const handleGenderToggle = () => {
		setGender((prevGender) => (prevGender === '남' ? '여' : '남'));
	};

	const handleCanvasMouseDown = (e) => {
		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		lastX.current = e.clientX - rect.left;
		lastY.current = e.clientY - rect.top;
		isDrawing.current = true;
	};

	const handleCanvasMouseMove = (e) => {
		if (!isDrawing.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		ctx.strokeStyle = 'black';
		ctx.lineWidth = 2;
		ctx.lineJoin = 'round';
		ctx.beginPath();
		ctx.moveTo(lastX.current, lastY.current);
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.stroke();

		lastX.current = x;
		lastY.current = y;
	};

	const handleCanvasMouseUp = () => {
		isDrawing.current = false;
	};

	const handleCanvasMouseOut = () => {
		isDrawing.current = false;
	};

	const handleClearCanvas = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	return (
		<div>
			<div className={`${styles.portfoliocard}`}>
				<div className={styles.coverphoto}></div>

				<div className={styles.right_col}>
					<h2 className={styles.name}>계약서</h2>

					<form onSubmit={handleSubmit}>
						<div className={styles.inputGroup}>
							<label>
								이름:
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className={styles.textField}
								/>
							</label>
						</div>
						<div className={styles.inputGroup}>
							<label>
								성별:
								<button
									type="button"
									onClick={handleGenderToggle}
									className={styles.genderToggle}
								>
									{gender}
								</button>
							</label>
						</div>
						<div className={styles.inputGroup}>
							<label
								style={{
									display: 'grid',
									alignItems: 'center',
								}}
							>
								{' '}
								{/* 레이블 높이 조정 */}
								서명
							</label>
							<canvas
								ref={canvasRef}
								width={300}
								height={100}
								className={styles.signatureCanvas}
								onMouseDown={handleCanvasMouseDown}
								onMouseMove={handleCanvasMouseMove}
								onMouseUp={handleCanvasMouseUp}
								onMouseOut={handleCanvasMouseOut}
							/>
							<br></br>
							<button
								onClick={handleClearCanvas}
								style={{
									padding: '5px 10px',
									marginTop: '5px',
									cursor: 'pointer',
									border: '1px solid #000', // 테두리 추가
									backgroundColor: '#fff', // 배경색
								}}
							>
								초기화
							</button>
						</div>
						<button
							type="submit"
							className={styles.contractButton}
							onClick={() => {
								navigate('/dodge');
							}}
						>
							계약하기
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Contract;
