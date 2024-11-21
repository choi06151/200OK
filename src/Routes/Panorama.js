import { useState, useEffect } from 'react';
import styles from '../Css/Panorama.module.css';
import { useNavigate } from 'react-router-dom';

function Panorama({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    // Initialize a new Audio object for the sound effect
    const soundEffect = new Audio('/sounds/click-button.mp3'); // Path to your sound file

    useEffect(() => {
        if (images.length === 0) return;  // If no images are provided, do nothing

        // Set an interval to change the image every 3 seconds
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                // Play the sound effect every time the image changes
                soundEffect.play(); 

                // If we're at the second-to-last image, stop the interval
                if (prevIndex < images.length - 2) {
                    return prevIndex + 1;
                } else {
                    clearInterval(intervalId); // Stop when we reach the second-to-last image
                    return prevIndex;
                }
            });
        }, 3000); // 3000ms = 3 seconds

        // Cleanup the interval when the component is unmounted or when the images change
        return () => clearInterval(intervalId);
    }, [images, soundEffect]); // Dependency array includes images to update the effect when the list changes

    return (
        <div className={styles.blackWhiteScreen}>
            {/* Display the film PNG as the background */}
            <img
                src="film.png" // Path to your film PNG
                alt="Film Strip"
                className={styles.filmImage}
            />
            
            {/* Display the current image from the list */}
            {images.length > 0 && (
                <img
                    src={images[currentIndex]} // Dynamically change the image based on the current index
                    alt="Film Strip"
                    className={styles.dynamicImage}
                />
            )}
        </div>
    );
}

export default Panorama;
