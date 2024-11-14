import React, { useEffect, useState } from 'react';
import '../Css/LoadingOverlay.css';

const LoadingOverlay = ({ text, show }) => {
  const [visible, setVisible] = useState(show); // 컴포넌트의 DOM 상태
  const [isFadingOut, setIsFadingOut] = useState(false); // 애니메이션 상태

  useEffect(() => {
    if (show) {
      setVisible(true); // 모달이 열릴 때 visible을 true로 설정
      setIsFadingOut(false); // fade-out 효과 초기화
    } else if (visible) {
      setIsFadingOut(true); // show가 false일 때 fade-out 시작
    }
  }, [show, visible]);

  // 애니메이션 종료 시점에 컴포넌트를 DOM에서 제거
  const handleAnimationEnd = () => {
    if (isFadingOut) {
      setVisible(false); // fade-out이 완료되면 컴포넌트 제거
    }
  };

  // visible이 false일 때 컴포넌트를 렌더링하지 않음
  if (!visible) return null;

  return (
    <div
      className={`overlay ${isFadingOut ? 'fade-out' : ''}`}
      onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 후 DOM에서 제거
    >
      <div className="text-container">
        <h1>{text}</h1>
      </div>
      <div className="image-container">
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
            className={`animal-image wave-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingOverlay;
