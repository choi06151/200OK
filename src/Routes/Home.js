import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainstyle from '../App.module.css';
import styles from '../Css/Home.module.css';

function Home() {
	const navigate = useNavigate();

	return (
		<div className={mainstyle.div}>
			<div style={{ margin: '0 auto' }}>
				<img className={styles.logo} src="amazonLogo2.png" alt="게임 로고" />
			</div>
			<button
				style={{ marginTop: '5%' }}
				className={styles.stylishButton}
				onClick={() => {
					sessionStorage.removeItem('userId');
					navigate('/story');
				}}
			>
				게임 시작
			</button>
		</div>
	);
}

export default Home;
