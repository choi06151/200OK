import React, { useEffect, useState } from 'react';
import styles from '../Css/LoadingOverlay.module.css';

const LoadingOverlay = ({ show, text }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [index, setIndex] = useState(0);
  const [isTextFadingOut, setIsTextFadingOut] = useState(false);

  useEffect(() => {
    if (show) {
      setIsFadingOut(false);
    } else {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setIsFadingOut(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTextFadingOut(true);
      setTimeout(() => {
        setIndex((index) => (index + 1) % text.length);
        setIsTextFadingOut(false);
      }, 500); // 텍스트가 바뀔 때의 fade-out 시간
    }, 3500);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div
      className={`${styles.overlay} ${
        isFadingOut ? styles.overlay_fade_out : ''
      }`}
    >
      <div
        className={`${styles.text_container} ${
          isTextFadingOut ? styles.fade_out : styles.fade_in
        }`}
      >
        <h1>{text[index]}</h1>
      </div>
      <div className={styles.image_container}>
        {[
          'frog.png',
          'crocodile.png',
          'lizard.png',
          'tucan.png',
          'jaguar.png',
        ].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`animal-${index}`}
            className={`${styles.animal_image} ${styles[`wave_${index}`]}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingOverlay;
