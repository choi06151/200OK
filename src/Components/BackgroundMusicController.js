import React, { useRef, useEffect, useState } from 'react';

const BackgroundMusicController = ({ mainMusic, mute, tag }) => {
  const audioRef = useRef(null);

  // 기본 음원 경로
  const basePath = `${process.env.PUBLIC_URL}/Sounds/`;

  const [nowPlaying, setNowPlaying] = useState(`${basePath}gameost.mp3`); // 초기 음원

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // 초기 볼륨 설정
    }
  }, []);

  useEffect(() => {
    // 음소거 상태 변경에 따른 볼륨 조정
    if (audioRef.current) {
      audioRef.current.volume = mute ? 0 : 0.3;
    }
  }, [mute]);

  useEffect(() => {
    console.log(mainMusic, tag);
    // mainMusic과 tag 상태를 기반으로 재생할 음원을 결정
    const nextMusic = mainMusic
      ? `${basePath}gameost.mp3` // mainMusic이 true일 때 메인 OST 재생
      : `${basePath}${tag || 'Peaceful'}SFX.mp3`; // mainMusic이 false일 때 태그 기반 음원 재생

    // 현재 재생 중인 음원과 다를 경우에만 업데이트
    if (nowPlaying !== nextMusic) {
      setNowPlaying(nextMusic);

      if (audioRef.current) {
        audioRef.current.load(); // 새 음원 로드
      }
    }
  }, [mainMusic]); // mainMusic, tag, nowPlaying 상태를 의존성으로 추가

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
