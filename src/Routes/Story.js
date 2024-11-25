import styles from '../Css/Story.module.css';

function Story() {
  // Array of image sources
  const images = [
    '0.png',
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

  return (
    <div className={styles.scrollContainer}>
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Page ${index + 1}`} className={styles.image} />
      ))}
    </div>
  );
}

export default Story;
