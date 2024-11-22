import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainstyle from '../App.module.css';
import Ranking from '../Components/Ranking';
import { getRanking } from '../service/service';
import styles from '../Css/Ending.module.css';
import Panorama from '../Components/Panorama';

function Ending() {
	const [modal, setModal] = useState(false); // 모달 상태
	const [rankingData, setRankingData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getRanking().then((response) => {
			setRankingData(response.data);
		});
	}, []);

	return (
		<div className={`${mainstyle.div} flex flex-col items-center`}>
			<div>
				<Panorama></Panorama>
			</div>
			{/* 모달 표시 */}
			{modal && (
				<Ranking rankingData={rankingData} onClose={() => setModal(false)} />
			)}

			<div className={styles.button_container}>
				{/* 홈으로 버튼 */}
				<button
					className={`${styles.modern_button} ${styles.home_button}`}
					onClick={() => {
						navigate('/');
					}}
				>
					홈으로
				</button>

				{/* 랭킹 보기 버튼 */}
				<button
					className={`${styles.modern_button} ${styles.ranking_button}`}
					onClick={() => {
						setModal(true);
					}}
				>
					랭킹 보기
				</button>
			</div>
		</div>
	);
}

export default Ending;
