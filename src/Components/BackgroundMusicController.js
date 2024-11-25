import React, { useRef, useEffect, useState } from 'react';

const BackgroundMusicController = ({ modal, mute }) => {
	const audioRef = useRef(null);
	const backgroundmusic = `${process.env.PUBLIC_URL}/Sounds/gameost.mp3`;
	const loadingmusic = `${process.env.PUBLIC_URL}/Sounds/jungle-background.mp3`;

	const [nowPlaying, setNowPlaying] = useState(backgroundmusic);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.035; // 초기 볼륨 설정
		}
	}, []);

	useEffect(() => {
		mute ? (audioRef.current.volume = 0) : (audioRef.current.volume = 0.035);
	}, [mute]);

	useEffect(() => {
		// modal 상태에 따라 nowPlaying 설정
		setNowPlaying(modal ? loadingmusic : backgroundmusic);

		if (audioRef.current) {
			audioRef.current.load(); // 새로운 소스를 로드
		}
	}, [modal]);

	const handleLoadedData = () => {
		// load 완료 후 play 호출
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	return (
		<div>
			<audio
				ref={audioRef}
				autoPlay
				loop
				onLoadedData={handleLoadedData} // 데이터 로드 완료 시 재생
				style={{
					width: '100%',
					maxWidth: '400px',
					border: '2px solid #333',
					borderRadius: '8px',
					padding: '10px',
					backgroundColor: '#f0f0f0',
				}}
			>
				<source src={nowPlaying} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
		</div>
	);
};

export default BackgroundMusicController;
