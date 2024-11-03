import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import mainstyle from '../App.module.css';
import styles from '../Css/Home.module.css';
import Contract from '../Components/Contract';

function Home() {
	const navigate = useNavigate();

	let [modal, setModal] = useState(false);

	const handleContract = () => {
		setModal(!modal);
		console.log(modal);
	};
	const closeModal = () => {
		setModal(false); // 모달을 닫을 때 오른쪽으로 보내기
	};

	return (
		<div className={mainstyle.div}>
			<div style={{ margin: '0 auto' }}>
				<img className={styles.logo} src="amazonLogo2.png" alt="게임 로고" />
			</div>
			<div>
				<h4 style={{ color: 'white' }}>
					2XXX년, 인류는 화성으로의 진출에 성공한다. 이제는 지구와 화성 간
					왕복이 당연해진 시대...
				</h4>
			</div>
			<button className={styles.stylishButton} onClick={handleContract}>
				취직하기
			</button>
			{modal && <div className={styles.overlay} onClick={closeModal}></div>}
			<div className={`${styles.modal} ${modal ? styles.show : ''}`}>
				<Contract />
			</div>
		</div>
	);
}

export default Home;
