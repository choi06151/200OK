import { useState } from 'react';
import styles from '../Css/Home.module.css';
import { useNavigate } from 'react-router-dom';

function Ending() {
	let [modal, setModal] = useState(0);
	const navigate = useNavigate();
	return (
		<div className={styles.div}>
			<h2>엔딩 화면임</h2>
			<button
				className="btn btn-primary"
				onClick={() => {
					navigate('/');
				}}
			>
				Retry
			</button>
		</div>
	);
}

export default Ending;
