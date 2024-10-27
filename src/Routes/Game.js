import { useNavigate } from 'react-router-dom';
import styles from '../Css/Home.module.css';

function Game() {
	const navigate = useNavigate();
	return (
		<div className={styles.div}>
			<h2>게임 화면임</h2>
			<button className="btn btn-info me-2">btn 1</button>
			<button className="btn btn-info me-2">btn 2</button>
			<button className="btn btn-info">btn 3</button>

			<div
				style={{
					marginTop: '60%',
					marginLeft: '60%',
					border: '1px solid green',
				}}
			>
				<h2>엔딩보기</h2>
				<button
					className="btn btn-primary"
					onClick={() => {
						navigate('/end');
					}}
				>
					To ending
				</button>
			</div>
		</div>
	);
}

export default Game;
