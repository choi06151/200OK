import { useNavigate } from 'react-router-dom';
import styles from '../Css/Home.module.css';

function Dodge() {
	const navigate = useNavigate();
	return (
		<div className={styles.div}>
			<h2>미니게임 화면임</h2>
			<button
				className="btn btn-primary"
				onClick={() => {
					navigate('/game');
				}}
			>
				To Game
			</button>
		</div>
	);
}

export default Dodge;
