import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mainstyle from '../App.module.css';
import styles from '../Css/Home.module.css';

function Home() {
  const navigate = useNavigate();

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트되면 fade-in 클래스를 활성화
    setFadeIn(true);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('userId')) {
      sessionStorage.removeItem('userId');
    }
  }, []);

  return (
    <div className={`${mainstyle.div} ${fadeIn ? styles.fadeIn : ''}`}>
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
