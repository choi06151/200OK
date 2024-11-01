import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../Css/Home.module.css';

function Home() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false); // 페이드 상태

  const handleButtonClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const changeGender = () => {
    // 성별 변경 로직 (필요시 추가)
  };

  const handleToDodge = () => {
    setIsFading(true); // 페이드 상태를 true로 설정
    setTimeout(() => {
      navigate('/dodge'); // 2초 후에 페이지 이동
    }, 2000);
  };

  return (
    <div className={styles.div}>
      {/* 상단 헤더와 로고 */}
      <header className={styles.Header}>
        <div className={styles.Logo}>
          <img src="logo.png" alt="게임 로고" />
          <h1>게임 이름</h1>
        </div>
      </header>

      <h2>홈화면입니다.</h2>
      <div style={{ width: '60%', margin: '0 auto', height: '40vh', border: '1px solid red' }}>
        로고임
      </div>
      <div>
        <h4 style={{ color: 'white' }}>
          2XXX년, 인류는 화성으로의 진출에 성공한다. 이제는 지구와 화성 간 왕복이 당연해진 시대...
        </h4>
      </div>
      <Button variant="primary" onClick={handleButtonClick}>
        취직하기
      </Button>

      {/* 계약 섹션 */}
      <div ref={scrollRef} style={{ marginTop: '100vh', color: 'white' }}>
        <h2>계약 화면입니다.</h2>
        <div style={{ width: '60%', margin: '0 auto', height: '40vh', border: '1px solid red' }}>
          <h2>로고입니다.</h2>
        </div>
        <div className="mt-3 mb-3">
          성별: <Button variant="light" onClick={changeGender}>남</Button>
        </div>
        <Button onClick={handleToDodge}>To Dodge</Button>
      </div>

      {isFading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: 0,
          transition: 'opacity 2s ease',
          zIndex: 1000,
          animation: 'fade 2s forwards'
        }} />
      )}

      <style>
        {`
          @keyframes fade {
            to {
              opacity: 1;
            }
          }
          .Header {
            background-image: url('your-background-image.jpg'); /* 이미지 파일 경로 */
            background-size: cover; /* 배경 이미지를 완전히 채우도록 설정 */
            background-position: center; /* 배경 이미지 위치 중앙 */
          }
        `}
      </style>
    </div>
  );
}

export default Home;
