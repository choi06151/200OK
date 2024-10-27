import { useNavigate } from 'react-router-dom';
import styles from '../Css/Home.module.css';
import Button from 'react-bootstrap/Button';

function Home() {
	const navigate = useNavigate();

	return (
		<div className={styles.div}>
			<h2>홈화면임</h2>
			<div
				style={{
					width: '60%',
					margin: '0 auto',
					height: '40vh',
					border: '1px solid red',
				}}
			>
				로고임
			</div>
			<div>
				<h4 style={{ color: 'white' }}>
					2XXX년, 인류는 화성으로의 진출에 성공한다. 이제는 지구와 화성 간
					왕복이 당연해진 시대. 그에 따라 ‘스페이스 딜리버리’ 서비스가 성행하게
					된다. ‘스페이스 딜리버리’, 화성에 원하는 배달도 언제든 보내주는 진짜
					로켓배송! 당신은 스페이스 딜리버리 서비스의 우수 비행사! 오늘도
					어김없이 화성으로의 로켓 배송을 떠나는 중, 예상치 못한 결함으로
					비상착륙을 하게 된다. 불행히도 착륙한 곳은 아마존의 깊은 밀림 속. 이제
					당신은 제한된 자원으로 생존을 위해 고군분투해야 한다.
				</h4>
			</div>

			<div>
				<Button
					variant="primary"
					onClick={() => {
						navigate('/contract');
					}}
				>
					취직하기
				</Button>
			</div>
		</div>
	);
}

export default Home;
