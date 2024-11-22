import React, { useEffect, useState } from 'react';
import styles from '../Css/Ranking.module.css';
import { getRanking } from '../service/service';

const Ranking = ({ onClose, rankingData }) => {
	const [isVisible, setIsVisible] = useState(false); // 애니메이션 상태

	useEffect(() => {
		// 모달이 처음 열릴 때 애니메이션 시작
		setIsVisible(true);
		const response = getRanking();
		console.log(response);
	}, []);

	const handleClose = () => {
		// 닫힐 때 애니메이션
		setIsVisible(false);
		setTimeout(() => {
			onClose(); // 부모 컴포넌트로 닫힘 상태 전달
		}, 300); // 애니메이션 시간과 동일하게 설정
	};

	return (
		<div className={styles.modalBackground} onClick={handleClose}>
			<div
				className={`${styles.modalContainer} ${
					isVisible ? styles.slideUp : styles.slideDown
				}`}
				onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않음
			>
				<h2>Ranking</h2>
				<table className={styles.rankingTable}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Day alived</th>
						</tr>
					</thead>
					<tbody>
						{rankingData.map((data, index) => (
							<tr key={index}>
								<td>{data.name}</td>
								<td>{data.day}</td>
							</tr>
						))}
					</tbody>
				</table>
				<button className={styles.closeBtn} onClick={handleClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default Ranking;
