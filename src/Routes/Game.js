  import React, { useEffect, useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Phaser from 'phaser';
  import styles from '../Css/Home.module.css';

  function Game({ water, food }) {
    const navigate = useNavigate();
    const clickSoundRef = useRef(null);  // 클릭 효과음 재생을 위한 useRef

    useEffect(() => {
      // Phaser 게임 인스턴스를 설정하고 배경 음악을 재생하는 설정
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x000000,  // 배경을 검정색으로 설정
        scene: {
          preload: preload,
          create: create,
        },
      };

      // Phaser 게임 인스턴스를 생성
      const game = new Phaser.Game(config);

      // Phaser preload 함수 - 배경 음악 로드
      function preload() {
        this.load.audio('backgroundMusic', 'Sounds/gameost.mp3'); // 여기에 실제 음악 경로 넣기
      }

      // Phaser create 함수 - 배경 음악 재생
      function create() {
        this.sound.play('backgroundMusic', {
          loop: true, // 반복 재생
          volume: 0.5, // 볼륨 조절
        });
      }

      // 컴포넌트 언마운트 시 음악 멈추기
      return () => {
        if (game.sound && game.sound.stopAll) {
          try {
            game.sound.stopAll(); // 모든 음악을 멈추고, Phaser 인스턴스를 종료
          } catch (error) {
            console.error('Error stopping sounds:', error);
          }
        } else {
          console.warn('Phaser sound manager is not initialized correctly.');
        }
        game.destroy(true);
      };
    
    }, []);  // 빈 배열을 넣어 컴포넌트가 마운트/언마운트될 때만 실행되도록 함

    // 버튼 클릭 시 효과음 재생 및 페이지 이동
    const handleButtonClick = () => {
      // 버튼 클릭 시 사운드 재생
      if (clickSoundRef.current) {
        clickSoundRef.current.play();
      }

      // 1초 후에 "wait.js"로 이동
      setTimeout(() => {
        navigate('/wait');
      }, 1000); // 1000ms = 1초 후에 페이지 이동
    };

    console.log('Water:', water);
    console.log('Food:', food);

    return (
      <div className={styles.div}>
        <h2>게임 화면임</h2>
        
        {/* 버튼 1, 2, 3 클릭 시 사운드 효과 및 페이지 이동 */}
        <button className="btn btn-info me-2" onClick={handleButtonClick}>
          btn 1
        </button>
        <button className="btn btn-info me-2" onClick={handleButtonClick}>
          btn 2
        </button>
        <button className="btn btn-info" onClick={handleButtonClick}>
          btn 3
        </button>

        <div
          style={{
            marginTop: '60%',
            marginLeft: '60%',
            border: '1px solid green',
          }}
        >
          <h2>엔딩보기</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate('/end');
            }}
          >
            To ending
          </button>
        </div>

        {/* 클릭 효과음 오디오 요소 */}
        <audio ref={clickSoundRef} src="Sounds/click-button.mp3" />
      </div>
    );
  }

  export default Game;
