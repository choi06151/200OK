import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import mainstyle from '../App.module.css';
import styles from '../Css/Home.module.css';
import Contract from '../Components/Contract';

function Home() {
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);

	// 클릭 시 재생할 오디오 파일을 위한 useRef
	const clickSoundRef = useRef(null);

	const handleContract = () => {
		// 클릭 시 사운드 재생
		if (clickSoundRef.current) {
			clickSoundRef.current.play(); // 버튼 클릭 시 사운드 재생
		}

		setModal(!modal);
		console.log(modal);
	};

	const closeModal = () => {
		setModal(false); // 모달을 닫을 때 오른쪽으로 보내기
	};

	return (
		<div className={mainstyle.div}>
			<div style={{ marginTop: '10%', margin: '0 auto' }}>
				<img className={styles.logo} src="amazonLogo2.png" alt="게임 로고" />
			</div>
			<button
				style={{ marginTop: '5%' }}
				className={styles.stylishButton}
				onClick={handleContract}
			>
				게임 시작
			</button>
			{modal && <div className={styles.overlay} onClick={closeModal}></div>}
			<div className={`${styles.modal} ${modal ? styles.show : ''}`}>
				<Contract />
			</div>
		</div>
	);
}

export default Home;
