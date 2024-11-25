import React, { useState } from 'react';
import styles from '../Css/Story.module.css';
import { useNavigate } from 'react-router-dom';

function Story() {
  // Array of image sources
  const navigate = useNavigate();
  const images = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
    '11.png',
  ];

  // State for the current image index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState(false); // For fade-in/out effect

  // Handle click to navigate pages based on click position
  const handleClick = (event) => {
    const clickX = event.clientX; // Get the X-coordinate of the click
    const screenWidth = window.innerWidth; // Get the width of the screen

    if (clickX < screenWidth / 2) {
      // If clicked on the left half of the screen
      if (currentIndex > 0) {
        setFadeState(true);
        setTimeout(() => {
          setCurrentIndex(currentIndex - 1); // Go to the previous image
          setFadeState(false);
        }, 300);
      }
    } else {
      // If clicked on the right half of the screen
      if (currentIndex < images.length - 1) {
        setFadeState(true);
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1); // Go to the next image
          setFadeState(false);
        }, 300);
      } else {
        navigate('/dodge');
      }
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        {/* Image with fade effect */}
        <img
          src={images[currentIndex]}
          alt={`Page ${currentIndex + 1}`}
          className={`${styles.image} ${
            fadeState ? styles.fadeOut : styles.fadeIn
          }`}
        />
      </div>
    </div>
  );
}

export default Story;
