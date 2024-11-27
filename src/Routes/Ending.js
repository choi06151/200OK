import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainstyle from '../App.module.css';
import Ranking from '../Components/Ranking';
import { getRanking, getUser } from '../service/service';
import styles from '../Css/Ending.module.css';
import Panorama from '../Components/Panorama';
import { useSelector } from 'react-redux';

function Ending() {
	const [modal, setModal] = useState(false); // 모달 상태
	const [rankingData, setRankingData] = useState([]);
	const navigate = useNavigate();

	const { water, food } = useSelector((state) => state.status);
	const [day, setDay] = useState();

	useEffect(() => {
		const id = sessionStorage.getItem('userId');
		getUser(id).then((response) => {
			setDay(response.data.day);
		});

		getRanking().then((response) => {
			setRankingData(response.data);
		});
	}, []);

	return (
		<div className={`${mainstyle.div} flex flex-col items-center`}>
			<div style={{ color: 'white ', marginTop: '5%' }}>
				<div
					style={{ fontWeight: '500', fontSize: '20px' }}
				>{`당신은 ${day}일간 살아남았으며, ${water}만큼의 물을 마시고 ${food}만큼의 음식을 섭취하였습니다. 당신의 (헛)고생은 많은 이들에게 기억될것입니다...`}</div>
				<div>{}</div>
				<br />
			</div>

			<Ranking rankingData={rankingData} onClose={() => setModal(false)} />

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
			</div>
		</div>
	);
}

export default Ending;
