import React, { useState } from 'react';
import styles from '../Css/DodgeTutorial.module.css';
import { useNavigate } from 'react-router-dom';

export default function DodgeTutorial() {
  const [currentPage, setCurrentPage] = useState(0);
  const images = [
    'SaveTutorial1.png',
    'SaveTutorial2.png',
    'SaveTutorial3.png',
    'SaveTutorial4.png',
  ];

  const navigate = useNavigate();

  const handleArrowClick = (direction) => {
    setFadeOut(true); // 이미지가 사라지도록 설정

    setTimeout(() => {
      if (direction === 'left' && currentPage > 0) {
        setCurrentPage(currentPage - 1); // 이전 페이지
      } else if (direction === 'right') {
        if (currentPage < images.length - 1) {
          setCurrentPage(currentPage + 1); // 다음 페이지
        } else {
          navigate('/dodge'); // 마지막 페이지에서 오른쪽 화살표 클릭 시 이동
        }
      }
      setFadeOut(false); // 이미지가 다시 나타나도록 설정
    }, 500); // fadeOut 효과 후 새로운 이미지로 전환
  };

  const [fadeOut, setFadeOut] = useState(false);

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
