import React, { useState } from 'react';
import styles from '../Css/Story.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setName } from '../store/gameSlice'; // Redux 액션 import

function Story() {
  const [shakeState, setShakeState] = useState(false); // 흔들림 상태 추가
  const [zoomInState, setZoomInState] = useState(false); // 확대 상태 추가
  const [fadeState, setFadeState] = useState(false); // 페이드 애니메이션 상태
  const [inputValue, setInputValue] = useState(''); // 텍스트 입력 상태 추가
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { name } = useSelector((state) => state.status);
  // 이미지 배열
  const images = [
    '1.png',
    '2.png',
    '5.png',
    '3.png',
    '4.png',
    'contract.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
    '11.png',
    '12.png',
    '13.png',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);


  // 현재 이미지 인덱스

  // 클릭 이벤트 처리 함수
  const handleClick = async (event) => {
    const clickX = event.clientX;
    const screenWidth = window.innerWidth;
    const leftBound = screenWidth * 0.3; // 좌측 클릭 상한 (30%)
    const rightBound = screenWidth * 0.7; // 우측 클릭 하한 (70%)
    if (shakeState || zoomInState) {
      return;
    }

    if (clickX <= leftBound) {
      // 왼쪽 클릭 (이전 페이지로 이동)
      if (currentIndex > 0) {
        setFadeState(true);
        setTimeout(() => {
          setCurrentIndex(currentIndex - 1);
          setFadeState(false);
          // 확대 효과 중지
          setZoomInState(false);
        }, 300);
      }
    } else if (clickX >= rightBound) {
      // 오른쪽 클릭 (다음 페이지로 진행)
      if (currentIndex < images.length - 1) {
        // 특정 페이지에서 흔들림 + 확대

        if (currentIndex === 9) {
          setTimeout(() => {
            setShakeState(true); // 흔들림 효과 시작
          }, 600);
          setTimeout(() => setShakeState(false), 1000); // 흔들림 애니메이션 지속시간
        }
        if (currentIndex === 4) {
          // 이름 저장 로직 추가
          dispatch(setName(inputValue)); // Redux 상태에 이름 저장
          alert(`이름이 저장되었습니다: ${inputValue}`);
        }
        if (currentIndex === 3) {
          // 흔들림 시작
          //setShakeState(true);
          setTimeout(() => {
            // 흔들림 종료 후 확대 시작
            //setShakeState(false);
            setZoomInState(true);

            // 확대 상태 유지 후 페이지 전환
            setTimeout(() => {
              setZoomInState(false); // 확대 종료
              setCurrentIndex((prevIndex) => prevIndex + 1); // 다음 인덱스로 이동
            }, 3000); // 확대 효과 지속 시간 (1초)
          }, 1000); // 흔들림 효과 지속 시간 (2초)
        } else if (currentIndex !== 9) {
          // 확대 없이 일반 전환
          setZoomInState(false);
          setFadeState(true);
          setTimeout(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setFadeState(false);
          }, 300);
        }

        // 특정 페이지에서 흔들림 없이 진행
        setFadeState(true);
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setFadeState(false);
        }, 300);
      } else {
        // 마지막 페이지면 /dodgetuto로 이동
        navigate('/dodgetutorial');
      }
    }
  };

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      dispatch(setName(inputValue)); // Redux 상태에 이름 저장
      alert(`입력된 이름: ${inputValue}`);
      setCurrentIndex((prevIndex) => prevIndex + 1); // 다음 인덱스로 이동
      setInputValue(''); // 입력 초기화
    } else {
      alert('이름을 입력해주세요!');
    }
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        {/* 이미지와 애니메이션 효과 */}
        <img
          src={images[currentIndex]}
          alt={`Page ${currentIndex + 1}`}
          className={`${styles.image} ${
            fadeState ? styles.fadeOut : styles.fadeIn
          } ${shakeState ? styles.shake : ''} ${
            zoomInState ? styles.zoomIn : ''
          }`}
        />
      </div>

      {currentIndex === 5 && (
        <div className={styles.inputForm}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.inputField}
          />
        </div>
      )}

      {/* 왼쪽 화살표 */}
      {currentIndex > 0 && (
        <button className={`${styles.arrowButton} ${styles.leftArrow}`}>
          &#8592;
        </button>
      )}

      {/* 오른쪽 화살표 */}
      {currentIndex < images.length - 1 && (
        <button className={`${styles.arrowButton} ${styles.rightArrow}`}>
          &#8594;
        </button>
      )}
    </div>
  );
}

export default Story;
