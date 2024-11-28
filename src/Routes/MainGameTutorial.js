import React, { useState } from 'react';
import styles from '../Css/MainGameTutorial.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MainGameTutorial() {
  const [currentPage, setCurrentPage] = useState(0);
  const images = [
    'MainTutorial1.png',
    'MainTutorial2.png',
    'MainTutorial3.png',
    'MainTutorial4.png',
    'MainTutorial5.png',
    'MainTutorial6.png',
  ];

  const navigate = useNavigate();
  const { state } = useLocation();
  const [fadeOut, setFadeOut] = useState(false);

  const handleArrowClick = (direction) => {
    setFadeOut(true); // 이미지가 사라지도록 설정

    setTimeout(() => {
      if (direction === 'left' && currentPage > 0) {
        setCurrentPage(currentPage - 1); // 이전 페이지
      } else if (direction === 'right') {
        if (currentPage < images.length - 1) {
          setCurrentPage(currentPage + 1); // 다음 페이지
        } else {
          navigate('/game', {
            state: { water: state.water, food: state.food },
          }); // 마지막 페이지에서 클릭 시 이동
        }
      }
      setFadeOut(false); // 이미지가 다시 나타나도록 설정
    }, 500); // fadeOut 효과 후 새로운 이미지로 전환
  };

  return (
    <div className={styles.tutorialContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={images[currentPage]}
          alt={`Page ${currentPage + 1}`}
          className={`${styles.tutorialImage} ${
            fadeOut ? styles.fadeOut : styles.fadeIn
          }`}
        />
      </div>

      {/* 왼쪽 화살표 */}
      {currentPage > 0 && (
        <button
          className={`${styles.arrowButton} ${styles.leftArrow}`}
          onClick={() => handleArrowClick('left')}
        >
          &#8592;
        </button>
      )}

      {/* 오른쪽 화살표 */}
      <button
        className={`${styles.arrowButton} ${styles.rightArrow}`}
        onClick={() => handleArrowClick('right')}
      >
        &#8594;
      </button>
    </div>
  );
}
