import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phaser from 'phaser';
import styles from '../Css/Game.module.css';
import mainstyle from '../App.module.css';

function Game({ water, food }) {
  const navigate = useNavigate();
  const clickSoundRef = useRef(null); // 클릭 효과음 재생을 위한 useRef

  let [choice, setChoice] = useState();
  let [content, setContent] = useState();
  let [game, setGame] = useState(null); // Phaser 게임 객체 상태로 관리

  useEffect(() => {
    // Phaser 게임 인스턴스를 설정하고 배경 음악을 재생하는 설정
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000, // 배경을 검정색으로 설정
      scene: {
        preload: preload,
        create: create,
      },
    };

    // Phaser 게임 인스턴스를 생성
    const newGame = new Phaser.Game(config);
    setGame(newGame); // Phaser 인스턴스를 상태로 관리

    // Phaser preload 함수 - 배경 음악 로드
    function preload() {
      this.load.audio('backgroundMusic', 'Sounds/gameost.mp3'); // 여기에 실제 음악 경로 넣기
    }

    // Phaser create 함수 - 배경 음악 재생
    function create() {
      // 사운드 객체가 완전히 초기화된 후에 재생 시작
      this.sound.play('backgroundMusic', {
        loop: true, // 반복 재생
        volume: 0.5, // 볼륨 조절
      });

      // 게임이 준비되었을 때만 stopAll() 호출
      this.game.events.once('shutdown', () => {
        // 게임 종료 이벤트가 발생했을 때 stopAll을 안전하게 호출
        if (this.sound && typeof this.sound.stopAll === 'function') {
          try {
            this.sound.stopAll(); // 모든 음악을 멈추고, Phaser 인스턴스를 종료
          } catch (error) {
            console.error('Error stopping sounds:', error);
          }
        }
      });
    }

    // 컴포넌트 언마운트 시 음악 멈추기
    return () => {
      if (newGame) {
        // Phaser 게임 종료 시점에 sound.stopAll()을 호출
        if (newGame.sound && typeof newGame.sound.stopAll === 'function') {
          try {
            newGame.sound.stopAll(); // 모든 음악을 멈추고, Phaser 인스턴스를 종료
          } catch (error) {
            console.error('Error stopping sounds:', error);
          }
        } else {
          console.warn('Phaser sound manager is not initialized correctly.');
        }

        // Phaser 게임 인스턴스 종료
        if (newGame) {
          newGame.destroy(true); // Phaser 인스턴스와 그에 따른 리소스 정리
        }
      }
    };
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트/언마운트될 때만 실행되도록 함

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
    <>
      <div className={mainstyle.div}>
        <div className={styles.imgdiv}>
          {' '}
          <img alt="img" className={styles.img} src="/jungleexample.jpg"></img>
        </div>
        <div className={styles.textdiv}>
          정글 한가운데, 습하고 숨 막히는 더위 속에서 날카로운 야생의 소리가
          사방에서 들려온다. 은신처를 찾는 것이 급선무다.
        </div>

        {/* 선택지 영역 */}
        <div className={styles.choiceContainer}>
          <div
            className={styles.choice}
            onClick={() => {
              setChoice(1);
            }}
          >
            <input type="radio" id="choice1" name="choices" defaultChecked />
            <label htmlFor="choice1">선택지 1: 가까운 강에서 물을 찾는다</label>
          </div>
          <div
            className={styles.choice}
            onClick={() => {
              setChoice(2);
            }}
          >
            <input type="radio" id="choice2" name="choices" />
            <label htmlFor="choice2">
              선택지 2: 주변에 먹을 만한 과일을 찾아본다
            </label>
          </div>
          <div
            className={styles.choice}
            onClick={() => {
              setChoice(3);
            }}
          >
            <input type="radio" id="choice3" name="choices" />
            <label htmlFor="choice3">선택지 3: 쉬면서 체력을 회복한다</label>
          </div>
        </div>

        <div className={styles.userdiv}>
          <div className={styles.statusdiv}>
            <img
              src="/water.png"
              alt="Water"
              className={styles.statusImage}
              style={{ border: '1px solid green' }}
            />
            물: 5
            <img src="/food.png" alt="Food" className={styles.statusImage} />
            <p>식량: 3</p>
          </div>
          <div className={styles.choicediv}>
            <button
              className={`${styles.submitButton}`}
              onClick={() => {
                handleButtonClick();

                console.log('선택지를 서버에 전송합니다.');
              }}
            >
              선택
            </button>
            {/* <button
              className={styles.submitButton}
              onClick={() => {
                navigate('/end');
              }}
            >
              엔딩보기
            </button> */}
          </div>
        </div>
      </div>

      {/* 클릭 효과음 오디오 요소 */}
      <audio ref={clickSoundRef} src="Sounds/click-button.mp3" />
    </>
  );
}

export default Game;
