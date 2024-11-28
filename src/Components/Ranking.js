import React, { useEffect, useState } from 'react';
import styles from '../Css/Ranking.module.css';
import { getRanking } from '../service/service';

const Ranking = ({ rankingData }) => {
	const [isVisible, setIsVisible] = useState(false); // 애니메이션 상태
	const [userId, setUserId] = useState(null); // 세션 스토리지의 userId

	useEffect(() => {
		// 모달이 처음 열릴 때 애니메이션 시작
		setIsVisible(true);
		const storedUserId = sessionStorage.getItem('userId'); // 세션 스토리지에서 userId 가져오기
		setUserId(storedUserId);
	}, []);

	return (
		<div>
			<div
				className={`${styles.modalContainer}`}
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
							<tr
								key={index}
								className={
									userId == data.id ? styles.highlightRow : '' // 현재 userId와 같은 행에 스타일 추가
								}
							>
								<td>{`${data.name}`}</td>
								<td>{data.day}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Ranking;
