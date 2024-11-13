import React, { useEffect, useState } from 'react';
import '../Css/LoadingOverlay.css'; // CSS는 아래 코드 참고

const LoadingOverlay = ({ text }) => {
	const [images, setImages] = useState([
		'frog.png',
		'dog.png',
		'lizard.png',
		'tucan.png',
		'.png',
	]);

	return (
		<div className="overlay">
			<div className="text-container">
				<h1>{text}</h1>
			</div>
			<div className="image-container">
				{images.map((src, index) => (
					<img
						key={index}
						src={src}
						alt={`animal-${index}`}
						className={`animal-image animal-${
							index % 2 === 0 ? 'grow' : 'shrink'
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default LoadingOverlay;
