import { useState, useEffect } from 'react';

const useBackgroundMusic = (audioFile) => {
  const [audio] = useState(() => new Audio(audioFile));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {
    audio.volume = volume;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, volume]);

  const playMusic = () => {
    audio.play();
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const changeVolume = (newVolume) => {
    const clampedVolume = Math.min(1, Math.max(0, newVolume));
    setVolume(clampedVolume);
    audio.volume = clampedVolume;
  };

  return { isPlaying, playMusic, pauseMusic, toggleMusic, volume, changeVolume };
};

export default useBackgroundMusic;
